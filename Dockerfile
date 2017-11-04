FROM node:8.8.1-alpine

WORKDIR ~/

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn compile

CMD [ "yarn", "server" ]
