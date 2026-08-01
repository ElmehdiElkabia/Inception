FROM debian:bullseye

RUN apt-get update && \
    apt-get install -y \
        php \
        php-mysql \
        wget && \
        rm -rf /var/lib/apt/lists/*


RUN wget -O /var/www/html/index.php \
    https://github.com/vrana/adminer/releases/download/v5.5.1/adminer-5.5.1-en.php

EXPOSE 8080

CMD ["php", "-S", "0.0.0.0:8080", "-t", "/var/www/html"]