# Developer Documentation

## Introduction

This document explains how a developer can set up, build, launch, manage
and troubleshoot the Inception infrastructure.

The project uses Docker Compose to build a multi-container
infrastructure containing NGINX, WordPress/PHP-FPM, MariaDB and the
implemented bonus services.

------------------------------------------------------------------------

# Prerequisites

The project is designed to run inside a Linux virtual machine.

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

# Repository Structure

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

Each required service is built from its own Dockerfile.

------------------------------------------------------------------------

# Configuration

Non-sensitive configuration is stored in:

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
DATA_PATH=/home/username/data
```

The `.env` file must not contain confidential passwords.

------------------------------------------------------------------------

# Secrets

Sensitive credentials are stored outside the Git repository.

Example:

``` text
/home/username/inception-secrets/
├── db_password.txt
├── db_root_password.txt
├── wordpress_admin_password.txt
├── wordpress_editor_password.txt
└── ftp_password.txt
```

Restrict access to the files:

``` bash
chmod 600 /home/username/inception-secrets/*
```

Docker Compose provides the required secrets to the relevant containers.

Inside containers they are available under:

``` text
/run/secrets/
```

For example:

``` text
/run/secrets/db_password
/run/secrets/db_root_password
```

Initialization scripts can read these files when creating users and
configuring services.

Secrets must never be hardcoded into Dockerfiles or committed to Git.

------------------------------------------------------------------------

# Build the Project

From the project root:

``` bash
make
```

The Makefile is the main entry point for building and starting the
infrastructure.

The Docker Compose commands can also be used directly:

``` bash
cd srcs
docker compose build
```

For a clean rebuild without cached layers:

``` bash
docker compose build --no-cache
```

------------------------------------------------------------------------

# Launch the Project

Start the complete infrastructure:

``` bash
cd srcs
docker compose up -d
```

Or use:

``` bash
make
```

Check the service state:

``` bash
docker compose ps
```

------------------------------------------------------------------------

# Stop the Project

Stop the containers:

``` bash
cd srcs
docker compose down
```

This removes the containers but preserves named volumes.

------------------------------------------------------------------------

# Rebuild the Infrastructure

When a Dockerfile or build configuration changes:

``` bash
docker compose build
docker compose up -d
```

For a completely fresh image build:

``` bash
docker compose build --no-cache
docker compose up -d
```

------------------------------------------------------------------------

# Docker Compose Commands

Start:

``` bash
docker compose up -d
```

Stop:

``` bash
docker compose down
```

Build:

``` bash
docker compose build
```

Clean rebuild:

``` bash
docker compose build --no-cache
```

Show services:

``` bash
docker compose ps
```

Show logs:

``` bash
docker compose logs
```

Follow logs:

``` bash
docker compose logs -f
```

Show a service's logs:

``` bash
docker compose logs nginx
docker compose logs wordpress
docker compose logs mariadb
```

Validate the Compose configuration:

``` bash
docker compose config
```

------------------------------------------------------------------------

# Container Management

List running containers:

``` bash
docker ps
```

List all containers:

``` bash
docker ps -a
```

Inspect a container:

``` bash
docker inspect <container>
```

Open a shell inside a container:

``` bash
docker exec -it <container> sh
```

View container logs:

``` bash
docker logs <container>
```

Stop a container:

``` bash
docker stop <container>
```

Start a container:

``` bash
docker start <container>
```

Remove a container:

``` bash
docker rm <container>
```

------------------------------------------------------------------------

# Image Management

List images:

``` bash
docker image ls
```

Inspect an image:

``` bash
docker image inspect <image>
```

View image build history:

``` bash
docker image history <image>
```

Remove an image:

``` bash
docker image rm <image>
```

Check Docker disk usage:

``` bash
docker system df
```

------------------------------------------------------------------------

# Network Management

List networks:

``` bash
docker network ls
```

Inspect a network:

``` bash
docker network inspect <network_name>
```

The project uses a dedicated Docker network so that services can
communicate with each other without exposing every service directly to
the host.

The main communication flow is:

``` text
NGINX
  |
  | FastCGI
  v
WordPress / PHP-FPM
  |
  | Database connection
  v
MariaDB
```

Host networking is not used.

------------------------------------------------------------------------

# Volume Management

List volumes:

``` bash
docker volume ls
```

Inspect a volume:

``` bash
docker volume inspect <volume_name>
```

Remove a volume:

``` bash
docker volume rm <volume_name>
```

The project uses named Docker volumes for:

``` text
MariaDB database data
WordPress website files
```

The required data path is:

``` text
/home/username/data
```

------------------------------------------------------------------------

# Data Persistence

Container filesystems are not used as the permanent storage location for
WordPress and MariaDB data.

Persistent data is stored in Docker named volumes.

Conceptually:

``` text
MariaDB container
       |
       v
MariaDB named volume
       |
       v
/home/username/data

WordPress container
       |
       v
WordPress named volume
       |
       v
/home/username/data
```

Recreating the containers preserves the data as long as the volumes are
preserved.

For example:

``` bash
docker compose down
docker compose up -d
```

does not remove the named volumes.

In contrast:

``` bash
docker compose down -v
```

removes Compose-managed volumes and can delete persistent data.

------------------------------------------------------------------------

# Request Flow

The main web request follows:

``` text
Browser
   |
   | HTTPS :443
   v
NGINX
   |
   | FastCGI
   v
PHP-FPM
   |
   v
WordPress
   |
   | Database connection
   v
MariaDB
```

NGINX is the only public entry point.

------------------------------------------------------------------------

# Service Responsibilities

## NGINX

-   HTTPS/TLS termination.
-   Public entry point.
-   HTTP request handling.
-   FastCGI communication with PHP-FPM.

## WordPress/PHP-FPM

-   Runs the WordPress PHP application.
-   Receives PHP requests from NGINX.
-   Communicates with MariaDB.

## MariaDB

-   Stores WordPress database data.
-   Provides database access to WordPress.

## Bonus Services

The implemented bonus services run in separate containers and are
configured in `docker-compose.yml`.

------------------------------------------------------------------------

# Troubleshooting Workflow

When a service fails, follow the request or dependency chain instead of
changing random configuration.

First:

``` bash
docker compose ps
```

Then inspect the relevant logs:

``` bash
docker compose logs nginx
docker compose logs wordpress
docker compose logs mariadb
```

Check the network:

``` bash
docker network ls
docker network inspect <network_name>
```

Check volumes:

``` bash
docker volume ls
docker volume inspect <volume_name>
```

Enter a container when necessary:

``` bash
docker exec -it <container> sh
```

Inside a container, verify secrets when relevant:

``` bash
ls -la /run/secrets/
```

------------------------------------------------------------------------

# Clean Testing

A clean rebuild is useful before submission or evaluation.

Stop the stack:

``` bash
docker compose down
```

Rebuild without cache:

``` bash
docker compose build --no-cache
```

Start:

``` bash
docker compose up -d
```

Verify:

``` bash
docker compose ps
```

Then test:

-   HTTPS access.
-   WordPress.
-   WordPress administration.
-   MariaDB.
-   Persistent volumes.
-   Bonus services.

------------------------------------------------------------------------

# Makefile Workflow

The Makefile is the main project entry point.

Typical commands include:

``` bash
make
make down
make clean
make fclean
make re
```

The exact behavior of each target is defined in the project's
`Makefile`.

Before changing a Makefile target, verify what Docker resources it
creates or removes.

------------------------------------------------------------------------

# Git and Security Checks

Before committing changes:

``` bash
git status
git diff
```

Search the tracked project for accidentally exposed credentials:

``` bash
git grep -i password
git grep -i secret
git grep -i api_key
```

Do not commit:

-   Passwords.
-   API keys.
-   Private credentials.
-   Secret files.

The actual secret files should remain outside the repository.

------------------------------------------------------------------------

# Development Workflow

A typical development cycle is:

``` text
Modify configuration or source
          |
          v
Build the affected image
          |
          v
Start/recreate containers
          |
          v
Check logs
          |
          v
Test the service
          |
          v
Check networking and persistence
          |
          v
Review Git changes
          |
          v
Commit
```

For Dockerfile changes:

``` bash
docker compose build
docker compose up -d
```

For a completely clean image test:

``` bash
docker compose build --no-cache
docker compose up -d
```

------------------------------------------------------------------------

# Security Principles

The project follows these principles:

-   No passwords in Dockerfiles.
-   No credentials committed to Git.
-   Non-sensitive configuration is stored in `.env`.
-   Confidential values are provided through Docker secrets.
-   NGINX is the only public entry point.
-   HTTPS is used on port 443.
-   Persistent application data is stored in Docker named volumes.
