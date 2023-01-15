FROM node:18.13-alpine

WORKDIR /usr/src/app

COPY . .

RUN chmod -R 777 ./

RUN yarn
RUN yarn generate

EXPOSE ${PORT}

RUN yarn build