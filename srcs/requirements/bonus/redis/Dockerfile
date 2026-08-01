FROM debian:bullseye

RUN apt-get update && \
    apt-get install -y redis-server && \
    apt-get clean 

CMD ["redis-server", "--protected-mode" , "no"]