COMPOSE_CMD = docker compose -f srcs/docker-compose.yml
DATA_DIR = /home/${USER}/data

all:
	@mkdir -p ${DATA_DIR}/mariadb
	@mkdir -p ${DATA_DIR}/wordpress
	@mkdir -p ${DATA_DIR}/portainer
	${COMPOSE_CMD} up -d --build

clean:
	${COMPOSE_CMD} down

fclean: clean
	docker volume rm inception_db inception_wp  inception_portainer_data

re: clean all

.PHONY: all down clean re

