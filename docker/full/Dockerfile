FROM node:8.9.0-alpine

ARG LOCAL_DEVELOPMENT
ENV LOCAL_DEVELOPMENT ${LOCAL_DEVELOPMENT}

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

WORKDIR ~/

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn compile

CMD [ "yarn", "server" ]
