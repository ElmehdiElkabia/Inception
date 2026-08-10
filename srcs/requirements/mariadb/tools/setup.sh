#!/bin/bash

set -e

MARIADB_ROOT_PASSWORD=$(cat /run/secrets/db_root_password)
MARIADB_PASSWORD=$(cat /run/secrets/db_password)

DATADIR="/var/lib/mysql"

mkdir -p /run/mysqld
chown -R mysql:mysql /run/mysqld

if [ ! -d "$DATADIR/mysql" ]; then
    echo "=> Initializing MariaDB..."

    mariadb-install-db --user=mysql --datadir="$DATADIR"

    echo "=> Starting temporary MariaDB server..."
    mysqld_safe \
        --datadir=/var/lib/mysql \
        --skip-networking &
    pid="$!"

    echo "=> Waiting for MariaDB..."
    until mysqladmin ping --silent; do
        sleep 1
    done

    echo "=> Setting root password..."
    mysql -u root <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY '${MARIADB_ROOT_PASSWORD}';
FLUSH PRIVILEGES;
EOF

    echo "=> Creating database and user..."
    mysql -u root -p"${MARIADB_ROOT_PASSWORD}" <<EOF
CREATE DATABASE IF NOT EXISTS \`${MARIADB_DATABASE}\`;

CREATE USER IF NOT EXISTS '${MARIADB_USER}'@'%' IDENTIFIED BY '${MARIADB_PASSWORD}';

GRANT ALL PRIVILEGES ON \`${MARIADB_DATABASE}\`.* TO '${MARIADB_USER}'@'%';

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '${MARIADB_ROOT_PASSWORD}' WITH GRANT OPTION;

FLUSH PRIVILEGES;
EOF

    echo "=> Stopping temporary MariaDB..."
    mysqladmin -u root -p"${MARIADB_ROOT_PASSWORD}" shutdown

    wait "$pid"
fi

echo "=> Starting MariaDB..."
exec mysqld \
    --user=mysql \
    --bind-address=0.0.0.0 \