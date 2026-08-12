FROM debian:bullseye

RUN apt-get update && apt-get install -y wget ca-certificates && \
    wget https://github.com/portainer/portainer/releases/download/2.44.0/portainer-2.44.0-linux-amd64.tar.gz && \
    tar -xzf portainer-2.44.0-linux-amd64.tar.gz && \
    mv portainer/portainer /usr/local/bin/portainer && \
    mv portainer/public /usr/local/bin/public && \
    rm -rf portainer portainer-2.44.0-linux-amd64.tar.gz

EXPOSE 9000

WORKDIR /usr/local/bin

CMD ["portainer", "--admin-password-file", "/run/secrets/portainer_password"]