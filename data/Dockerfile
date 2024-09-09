FROM mysql:latest

COPY /init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

ENV MYSQL_ROOT_PASSWORD=123
ENV MYSQL_DATABAS=sogaz
