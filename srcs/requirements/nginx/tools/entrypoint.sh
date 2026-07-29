#!/bin/bash

SSL_CERT="/etc/nginx/ssl/inception.crt"
SSL_KEY="/etc/nginx/ssl/inception.key"

if [ ! -f "$SSL_CERT" ]; then
    echo "SSL certificate or key not found. Generating self-signed certificate..."
    mkdir -p /etc/nginx/ssl
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$SSL_KEY" \
        -out "$SSL_CERT" \
        -subj "/C=MA/ST=BENGUERIR/L=Benguerir/O=1337/OU=student/CN=${DOMAIN_NAME}"

    echo "Self-signed SSL certificate generated at $SSL_CERT and key at $SSL_KEY."
else
    echo "SSL certificate and key already exist. Skipping generation."
fi

exec nginx -g "daemon off;"