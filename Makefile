COMPOSE_CMD = docker compose -f srcs/docker-compose.yml
DATA_DIR = /home/${USER}/data

all:
	@mkdir -p ${DATA_DIR}/mariadb
	@mkdir -p ${DATA_DIR}/wordpress
	${COMPOSE_CMD} up -d --build

down:
	${COMPOSE_CMD} down

clean:
	${COMPOSE_CMD} down -v
	@sudo rm -rf ${DATA_DIR}

re: clean all

.PHONY: all down clean re