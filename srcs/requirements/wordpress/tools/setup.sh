#!/bin/bash

set -e

echo "=> Waiting for MariaDB..."

until mysqladmin \
    -h"${MARIADB_HOST}" \
    -u"${MARIADB_USER}" \
    -p"${MARIADB_PASSWORD}" \
    ping
do
    echo "=> Waiting for MariaDB connection..."
    sleep 2
done

echo "=> MariaDB is ready!"
echo "=> Checking if WordPress is downloaded..."
if [ ! -f /var/www/html/index.php ]; then
    echo "=> Downloading WordPress..."

    wp core download \
        --path=/var/www/html \
        --allow-root \
        --locale=en_US

    chown -R www-data:www-data /var/www/html
fi

echo "=> Checking if wp-config.php exists..."
if [ ! -f /var/www/html/wp-config.php ]; then
    echo "=> Creating wp-config.php..."

    wp config create \
        --path=/var/www/html \
        --dbname="${MARIADB_DATABASE}" \
        --dbuser="${MARIADB_USER}" \
        --dbpass="${MARIADB_PASSWORD}" \
        --dbhost="${MARIADB_HOST}" \
        --allow-root

    wp config set \
        --path=/var/www/html \
        WP_HOME "https://${DOMAIN_NAME}" \
        --allow-root

    wp config set \
        --path=/var/www/html \
        WP_SITEURL "https://${DOMAIN_NAME}" \
        --allow-root

    echo "=> Configuring Redis..."

    wp config set WP_CACHE true \
        --raw \
        --path=/var/www/html \
        --allow-root

    wp config set WP_REDIS_HOST redis \
        --path=/var/www/html \
        --allow-root

    wp config set WP_REDIS_PORT 6379 \
        --raw \
        --path=/var/www/html \
        --allow-root

    wp config set WP_REDIS_CLIENT phpredis \
        --path=/var/www/html \
        --allow-root
fi

echo "=> Checking if WordPress is installed..."
if ! wp core is-installed \
    --path=/var/www/html \
    --allow-root
then
    echo "=> Installing WordPress..."

    wp core install \
        --path=/var/www/html \
        --url="https://${DOMAIN_NAME}" \
        --title="Inception" \
        --admin_user="${WORDPRESS_ADMIN_USER}" \
        --admin_password="${WORDPRESS_ADMIN_PASSWORD}" \
        --admin_email="${WORDPRESS_ADMIN_EMAIL}" \
        --skip-email \
        --allow-root

    echo "=> Installing the Redis Object Cache plugin..."

    wp plugin install redis-cache --activate --path=/var/www/html --allow-root

    echo "=> Enabling Redis Object Cache..."

    if wp redis enable --path=/var/www/html --allow-root
    then
        echo "=> Redis enabled successfully."
    else
        echo "=> Failed to enable Redis."
    fi

    echo "=> Redis Object Cache plugin installed and configured."

    echo "=> Creating editor user..."

    wp user create \
        editor \
        editor@${DOMAIN_NAME} \
        --role=editor \
        --user_pass="${WORDPRESS_EDITOR_PASSWORD}" \
        --path=/var/www/html \
        --allow-root
fi

echo "=> Setting permissions..."

chown -R www-data:www-data /var/www/html
chmod -R 775 /var/www/html

echo "=> Starting PHP-FPM..."

mkdir -p /run/php

exec php-fpm7.4 --nodaemonize -F