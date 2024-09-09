FROM node:20

RUN mkdir /src

WORKDIR /src

COPY . ./

WORKDIR /src/api

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
