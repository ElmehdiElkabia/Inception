FROM debian:bullseye

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y redis-server && \
    apt-get clean 

CMD ["redis-server", "--protected-mode" , "no"]