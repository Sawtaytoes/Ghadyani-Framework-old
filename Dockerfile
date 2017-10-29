FROM node:8.8.1-alpine
RUN apk update
RUN apk add yarn
COPY package.json yarn.lock /
RUN yarn install
COPY . /
EXPOSE 3000
CMD [ "yarn", "start" ]
