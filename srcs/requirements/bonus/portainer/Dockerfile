FROM debian:bullseye

RUN apt-get update -y && \
    apt-get install -y wget tar ca-certificates


RUN wget https://github.com/portainer/portainer/releases/download/2.19.4/portainer-2.19.4-linux-amd64.tar.gz -O portainer.tar.gz && \
    tar -xvf portainer.tar.gz && \
    rm portainer.tar.gz

EXPOSE 9000

CMD ["/portainer/portainer"]