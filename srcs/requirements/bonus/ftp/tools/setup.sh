#!/bin/bash

set -e

FTP_PASSWORD=$(cat /run/secrets/ftp_password)

echo "=> Starting FTP setup..."

mkdir -p /var/run/vsftpd/empty
chmod 755 /var/run/vsftpd
chmod 555 /var/run/vsftpd/empty

if ! id "${FTP_USER}" >/dev/null 2>&1; then
    echo "=> Creating user ${FTP_USER}..."

    useradd \
        -m \
        -d /var/www/html \
        -s /bin/bash \
        -G www-data \
        "${FTP_USER}"
fi

usermod -aG www-data "${FTP_USER}"

echo "${FTP_USER}:${FTP_PASSWORD}" | chpasswd


echo "=> Starting vsftpd..."
exec /usr/sbin/vsftpd /etc/vsftpd.conf