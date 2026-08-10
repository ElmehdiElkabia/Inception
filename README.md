*This project has been created as part of the 42 curriculum by
eelkabia.*

# Inception

## Description

Inception is a system administration project from the 42 curriculum
designed to introduce Docker and containerization.

The goal of this project is to build a small and secure infrastructure
using Docker Compose. The infrastructure is composed of multiple
services, with each service running in its own dedicated container.

The main infrastructure consists of:

-   NGINX with TLS/HTTPS.
-   WordPress with PHP-FPM.
-   MariaDB as the WordPress database.
-   Persistent Docker named volumes for WordPress files and MariaDB
    data.
-   A dedicated Docker network for communication between services.
-   Additional bonus services.

NGINX is the only public entry point and the website is accessed through
HTTPS on port 443.

The project uses custom Dockerfiles based on Debian or Alpine rather
than ready-made service images.

------------------------------------------------------------------------

# Project Description

## Architecture

The main request flow is:

``` text
                         Internet
                            |
                       HTTPS :443
                            |
                            v
                     +-------------+
                     |    NGINX    |
                     | TLS 1.2/1.3 |
                     +------+------+
                            |
                         FastCGI
                            |
                            v
                  +-------------------+
                  |     WordPress     |
                  |      PHP-FPM      |
                  +---------+---------+
                            |
                         MariaDB
                            |
                            v
                    +---------------+
                    | MariaDB Volume|
                    +---------------+

                  WordPress Files
                         |
                         v
                  +---------------+
                  | WordPress      |
                  | Named Volume   |
                  +---------------+
```

All containers communicate through a dedicated Docker network.

## Services

### NGINX

NGINX is the public entry point of the infrastructure.

Responsibilities:

-   Accept HTTPS connections.
-   Handle TLS encryption.
-   Receive web requests.
-   Forward PHP requests to PHP-FPM.
-   Provide the HTTPS endpoint on port 443.

### WordPress

WordPress provides the web application.

It runs with PHP-FPM and does not contain NGINX.

PHP-FPM receives PHP requests from NGINX through FastCGI and executes
the WordPress PHP application.

### MariaDB

MariaDB stores WordPress data in a dedicated database.

It runs in its own container and communicates with WordPress through the
Docker network.

### Bonus Services

The project also includes the implemented bonus services. These services
are isolated in their own containers and communicate through the Docker
infrastructure according to their role.

------------------------------------------------------------------------

# Docker Design Choices

## Why Docker?

Docker allows applications and their dependencies to be packaged into
isolated and reproducible containers.

Instead of installing NGINX, PHP-FPM, MariaDB and their dependencies
directly on the host system, each service is isolated in its own
container.

This provides:

-   Service isolation.
-   Reproducible environments.
-   Independent service configuration.
-   Clear separation of responsibilities.
-   Easier deployment and maintenance.

------------------------------------------------------------------------

## Virtual Machines vs Docker

  -----------------------------------------------------------------------
  Virtual Machines                    Docker Containers
  ----------------------------------- -----------------------------------
  Virtualize a complete machine       Isolate application processes

  Each VM has its own operating       Containers share the host kernel
  system                              

  Usually require more resources      Usually use fewer resources

  Usually slower to start             Usually faster to start

  Provide hardware-level              Provide OS-level process isolation
  virtualization                      
  -----------------------------------------------------------------------

A virtual machine contains a complete guest operating system and its own
kernel.

Containers share the host operating system kernel while providing
isolated processes, filesystems and networking environments.

For this project, Docker is appropriate because each service can run
independently while sharing the host kernel.

------------------------------------------------------------------------

## Secrets vs Environment Variables

### Environment Variables

Environment variables are used for non-sensitive configuration, for
example:

``` text
DOMAIN_NAME
MARIADB_HOST
MARIADB_DATABASE
MARIADB_USER
WORDPRESS_ADMIN_USER
WORDPRESS_ADMIN_EMAIL
FTP_USER
DATA_PATH
```

They allow configuration to be changed without modifying the
Dockerfiles.

The project uses a `.env` file for these configuration values.

### Secrets

Secrets are used for confidential information such as:

``` text
Database passwords
Root database password
WordPress administrator password
WordPress editor password
FTP password
```

Docker secrets are made available inside the required containers
through:

``` text
/run/secrets/
```

Passwords must not be hardcoded in Dockerfiles or committed to Git.

------------------------------------------------------------------------

## Docker Network vs Host Network

### Docker Network

The project uses a dedicated Docker network:

``` text
NGINX
  |
  +------ Docker Network ------+
                               |
                           WordPress
                               |
                           MariaDB
```

Containers communicate with each other through the Docker network
without exposing every service directly to the host.

### Host Network

With host networking, a container shares the host's network namespace.

This reduces network isolation and is not used in this project.

The Inception requirements prohibit host networking.

------------------------------------------------------------------------

## Docker Volumes vs Bind Mounts

### Docker Named Volumes

The project uses Docker named volumes for persistent WordPress and
MariaDB data.

A named volume is managed by Docker and survives container recreation.

The persistent data is stored under:

``` text
/home/qifrey/data
```

The project uses persistent storage for:

-   MariaDB database data.
-   WordPress website files.

### Bind Mounts

A bind mount directly maps a host filesystem path into a container.

For example:

``` text
/home/user/project:/app
```

Bind mounts depend directly on a specific host path.

The required WordPress and MariaDB persistent storage in this project
uses Docker named volumes.

------------------------------------------------------------------------

# Project Structure

``` text
inception/
├── Makefile
├── README.md
├── USER_DOC.md
├── DEV_DOC.md
├── .gitignore
│
└── srcs/
    ├── .env
    ├── docker-compose.yml
    │
    └── requirements/
        ├── nginx/
        │   ├── Dockerfile
        │   ├── conf/
        │   └── tools/
        │
        ├── wordpress/
        │   ├── Dockerfile
        │   ├── conf/
        │   └── tools/
        │
        ├── mariadb/
        │   ├── Dockerfile
        │   ├── conf/
        │   └── tools/
        │
        └── bonus/
            └── ...
```

Each service is built from its own Dockerfile.

------------------------------------------------------------------------

# Technical Choices

## One Service Per Container

Each main service has its own container:

``` text
NGINX      → NGINX container
WordPress  → WordPress/PHP-FPM container
MariaDB    → MariaDB container
```

This follows the principle of separating services instead of combining
multiple major services into a single container.

## NGINX as the Only Entry Point

NGINX is the only public entry point.

The infrastructure uses:

``` text
HTTPS
Port 443
TLS 1.2 / TLS 1.3
```

WordPress and MariaDB are not exposed directly as public entry points.

## Persistent Storage

Two persistent data areas are used:

``` text
MariaDB data
WordPress files
```

They are stored using Docker named volumes so that container recreation
does not remove the application data.

## Custom Images

The project builds its own service images from Debian or Alpine base
images.

Ready-made service images are not used for the required services.

------------------------------------------------------------------------

# Instructions

## Prerequisites

The project must be run inside a Linux virtual machine.

Required tools:

-   Docker Engine.
-   Docker Compose.
-   Make.
-   Git.

Check the installation:

``` bash
docker --version
docker compose version
make --version
git --version
```

------------------------------------------------------------------------

## Configuration

The non-sensitive configuration is stored in:

``` text
srcs/.env
```

Example:

``` env
DOMAIN_NAME=eelkabia.42.fr
MARIADB_HOST=mariadb
MARIADB_DATABASE=wordpress
MARIADB_USER=wp_user
WORDPRESS_ADMIN_USER=eelkabia
WORDPRESS_ADMIN_EMAIL=admin@eelkabia.42.fr
WORDPRESS_EDITOR_USER=editor
FTP_USER=ftp_user
DATA_PATH=/home/qifrey/data
```

Sensitive credentials must not be placed in the `.env` file.

------------------------------------------------------------------------

## Secrets

Sensitive credentials are stored outside the Git repository.

Example:

``` text
/home/qifrey/inception-secrets/
├── db_password.txt
├── db_root_password.txt
├── wordpress_admin_password.txt
├── wordpress_editor_password.txt
└── ftp_password.txt
```

The secret files should be protected:

``` bash
chmod 600 /home/qifrey/inception-secrets/*
```

Docker Compose provides these secrets to the appropriate containers.

Inside the containers they are available under:

``` text
/run/secrets/
```

------------------------------------------------------------------------

## Build and Start

From the project root:

``` bash
make
```

Or directly with Docker Compose:

``` bash
cd srcs
docker compose build
docker compose up -d
```

------------------------------------------------------------------------

## Stop the Project

``` bash
make down
```

Or:

``` bash
cd srcs
docker compose down
```

Stopping the containers does not normally remove persistent volumes.

------------------------------------------------------------------------

## Clean the Project

To stop and remove containers:

``` bash
docker compose down
```

To also remove Compose-managed volumes:

``` bash
docker compose down -v
```

**Warning:** `docker compose down -v` can remove persistent WordPress
and MariaDB data.

------------------------------------------------------------------------

# Accessing the Website

The WordPress website is available at:

``` text
https://eelkabia.42.fr
```

The WordPress administration panel is available at:

``` text
https://eelkabia.42.fr/wp-admin
```

------------------------------------------------------------------------

# Checking the Infrastructure

Check running containers:

``` bash
docker ps
```

Check all containers:

``` bash
docker ps -a
```

Check Docker images:

``` bash
docker images
```

Check networks:

``` bash
docker network ls
```

Check volumes:

``` bash
docker volume ls
```

Check Compose services:

``` bash
cd srcs
docker compose ps
```

------------------------------------------------------------------------

# Logs and Troubleshooting

View all logs:

``` bash
docker compose logs
```

Follow logs:

``` bash
docker compose logs -f
```

NGINX:

``` bash
docker compose logs nginx
```

WordPress:

``` bash
docker compose logs wordpress
```

MariaDB:

``` bash
docker compose logs mariadb
```

If a container is failing, first check:

``` bash
docker compose ps
docker compose logs <service>
```

Then inspect the relevant network, volume and container.

------------------------------------------------------------------------

# Resources

## Official Documentation

-   Docker Documentation\
    https://docs.docker.com/

-   Docker Engine\
    https://docs.docker.com/engine/

-   Dockerfile Reference\
    https://docs.docker.com/reference/dockerfile/

-   Docker Compose\
    https://docs.docker.com/compose/

-   Docker Volumes\
    https://docs.docker.com/engine/storage/volumes/

-   Docker Networking\
    https://docs.docker.com/engine/network/

-   Docker Secrets\
    https://docs.docker.com/engine/swarm/secrets/

-   NGINX Documentation\
    https://nginx.org/en/docs/

-   WordPress Developer Documentation\
    https://developer.wordpress.org/

-   MariaDB Documentation\
    https://mariadb.com/docs/

-   PHP-FPM Documentation\
    https://www.php.net/manual/en/install.fpm.php

## Other References

-   The official 42 Inception project subject.
-   Docker documentation and command references.
-   Tutorials and technical articles used to understand Docker, NGINX,
    PHP-FPM, MariaDB, networking, volumes and TLS.

------------------------------------------------------------------------

# AI Usage

AI tools were used as a learning and productivity assistant during the
development of this project.

AI was used for:

-   Understanding Docker and containerization concepts.
-   Understanding Dockerfiles and Docker image construction.
-   Understanding Docker Compose.
-   Understanding Docker networks and volumes.
-   Troubleshooting Docker, NGINX, PHP-FPM and MariaDB configuration
    issues.
-   Reviewing configuration files and shell scripts.
-   Understanding environment variables and Docker secrets.
-   Reviewing the project documentation.
-   Preparing explanations and evaluation questions.

AI-generated suggestions were reviewed, tested and adapted before being
used in the project.

The final implementation was tested manually and the project
configuration was understood by the developer.

------------------------------------------------------------------------

# Conclusion

Inception demonstrates how to build a small infrastructure using Docker
Compose and isolated services.

The final architecture separates NGINX, WordPress/PHP-FPM and MariaDB
into dedicated containers, connects them through a Docker network,
protects the public entry point with TLS, and uses persistent Docker
volumes for application data.

The project also demonstrates containerization, service isolation,
networking, persistent storage, secrets management and secure web
service deployment.
