FROM node:8.8.1-alpine

RUN apk update
RUN apk add yarn

WORKDIR ~/
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn compile

EXPOSE 3000
CMD [ "yarn", "server" ]
