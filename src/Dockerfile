FROM ubuntu:20.04

RUN apt-get update && apt-get install -y nodejs npm sqlite3

RUN mkdir /app

WORKDIR /app

RUN mkdir ./data

COPY /data/sogaz.db ./data

COPY /src ./src

WORKDIR /app/src/api

RUN npm install

EXPOSE 3000
