# User Documentation

## Introduction

This document explains how an end user or administrator can use the
Inception infrastructure.

The stack provides a WordPress website behind an NGINX HTTPS entry
point, with PHP-FPM handling PHP execution and MariaDB storing the
WordPress database. Additional bonus services are also available
according to the project configuration.

------------------------------------------------------------------------

## Services Provided

### NGINX

NGINX is the only public entry point.

It:

-   Accepts HTTPS connections.
-   Handles TLS encryption.
-   Receives web requests.
-   Forwards PHP requests to PHP-FPM.

The public web entry point uses port `443`.

### WordPress

WordPress provides the website application.

PHP-FPM executes the WordPress PHP code. WordPress communicates with
MariaDB through the Docker network.

### MariaDB

MariaDB stores the WordPress database.

Its data is stored in persistent Docker storage so that recreating the
container does not normally remove the database.

### Bonus Services

The project also contains the implemented bonus services. Their purpose
and access depend on the configuration in `srcs/docker-compose.yml`.

------------------------------------------------------------------------

# Starting the Project

From the project root:

``` bash
make
```

Or directly with Docker Compose:

``` bash
cd srcs
docker compose up -d
```

Check the running services:

``` bash
docker ps
```

or:

``` bash
cd srcs
docker compose ps
```

------------------------------------------------------------------------

# Stopping the Project

To stop the stack:

``` bash
make down
```

or:

``` bash
cd srcs
docker compose down
```

Stopping the containers does not normally remove persistent named
volumes.

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

Use the configured WordPress administrator credentials to access the
administration panel.

------------------------------------------------------------------------

# Credentials

Sensitive credentials must not be stored directly in Dockerfiles or
committed to the Git repository.

The project uses Docker secrets for confidential information.

Typical secret files include:

``` text
db_password.txt
db_root_password.txt
wordpress_admin_password.txt
wordpress_editor_password.txt
ftp_password.txt
```

They are stored outside the Git repository, for example:

``` text
/home/username/inception-secrets/
```

Inside the appropriate containers, Docker makes secrets available under:

``` text
/run/secrets/
```

For example:

``` text
/run/secrets/db_password
/run/secrets/db_root_password
```

Only authorized users should have access to the secret files.

------------------------------------------------------------------------

# Checking That Services Are Running

## Check Containers

``` bash
docker ps
```

You should see the project's required containers running.

For a complete Compose status:

``` bash
cd srcs
docker compose ps
```

## Check Logs

View all service logs:

``` bash
docker compose logs
```

Follow logs in real time:

``` bash
docker compose logs -f
```

Check an individual service:

``` bash
docker compose logs nginx
docker compose logs wordpress
docker compose logs mariadb
```

## Check the Docker Network

List networks:

``` bash
docker network ls
```

Inspect the project's network:

``` bash
docker network inspect <network_name>
```

NGINX, WordPress and MariaDB should be connected through the project's
Docker network.

## Check Persistent Volumes

List volumes:

``` bash
docker volume ls
```

Inspect a volume:

``` bash
docker volume inspect <volume_name>
```

The project uses persistent storage for:

-   MariaDB database data.
-   WordPress website files.

The required data location is:

``` text
/home/username/data
```

------------------------------------------------------------------------

# Restarting the Project

To recreate the containers:

``` bash
cd srcs
docker compose down
docker compose up -d
```

The named volumes are preserved unless they are explicitly removed.

------------------------------------------------------------------------

# Important Warning

Do not use:

``` bash
docker compose down -v
```

unless you intentionally want to remove the Compose-managed volumes.

Removing the volumes can delete persistent MariaDB and WordPress data.

------------------------------------------------------------------------

# Basic Troubleshooting

## Website Is Not Accessible

Check the containers:

``` bash
docker compose ps
```

Check NGINX:

``` bash
docker compose logs nginx
```

Verify that the HTTPS entry point is available on port `443`.

## WordPress Has an Error

Check:

``` bash
docker compose logs wordpress
```

Also verify that WordPress can communicate with MariaDB through the
Docker network.

## MariaDB Has an Error

Check:

``` bash
docker compose logs mariadb
```

Verify that:

-   The MariaDB container is running.
-   The database configuration is correct.
-   The required secrets are available.
-   The MariaDB volume exists.

## A Container Keeps Restarting

Check:

``` bash
docker compose ps
docker compose logs <service>
```

The logs normally indicate why the service's main process is exiting.

------------------------------------------------------------------------

# Data Persistence

The project uses Docker named volumes for persistent application data.

The important persistent data is:

``` text
MariaDB database
WordPress website files
```

Removing and recreating containers does not normally remove this data.

However, removing the volumes does.

------------------------------------------------------------------------

# Security Notes

-   Do not commit passwords or API keys.
-   Do not put passwords in Dockerfiles.
-   Keep secret files outside the Git repository.
-   Restrict access to secret files.
-   Use HTTPS when accessing the website.
-   NGINX is the public entry point.
