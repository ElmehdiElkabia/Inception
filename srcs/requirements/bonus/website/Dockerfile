FROM debian:bullseye

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y nginx openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/nginx/ssl

RUN openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/inception.key \
    -out /etc/nginx/ssl/inception.crt \
    -subj "/C=MA/ST=Casablanca/L=Casablanca/O=42/CN=eelkabia.42.fr"

COPY conf/website.conf /etc/nginx/conf.d/default.conf
COPY html/ /var/www/html/

EXPOSE 8443

CMD ["nginx", "-g", "daemon off;"]