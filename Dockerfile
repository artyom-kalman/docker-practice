FROM alpine:latest

RUN apk add --no-cache npm sqlite

RUN mkdir /app

WORKDIR /app

RUN mkdir ./data

COPY /data/init.sql ./data

RUN sqlite3 ./data/sogaz.db < ./data/init.sql

COPY /src ./src

WORKDIR /app/src/api

RUN npm install

RUN npm rebuild

EXPOSE 3000

CMD ["npm", "start"]
