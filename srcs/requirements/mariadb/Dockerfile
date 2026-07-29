FROM debian:bullseye

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y mariadb-server && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /var/lib/mysql/* && \
    mkdir -p /etc/mysql/scripts

COPY tools/setup.sh /etc/mysql/scripts/setup.sh

RUN chmod +x /etc/mysql/scripts/setup.sh


CMD ["/etc/mysql/scripts/setup.sh"]
