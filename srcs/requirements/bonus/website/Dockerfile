FROM debian:bullseye

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y nginx openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/nginx/ssl

COPY conf/website.conf /etc/nginx/conf.d/default.conf
COPY html/ /var/www/html/

EXPOSE 8443

CMD ["nginx", "-g", "daemon off;"]