FROM debian:bullseye

RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get install -y openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY /conf/nginx.conf /etc/nginx/conf.d/default.conf

COPY /tools/entrypoint.sh /etc/nginx/entrypoint.sh

RUN chmod +x /etc/nginx/entrypoint.sh

CMD ["/etc/nginx/entrypoint.sh"]
