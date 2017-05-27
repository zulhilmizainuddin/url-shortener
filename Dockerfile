FROM node:alpine

RUN mkdir -p /app/url-shortener
WORKDIR /app/url-shortener

RUN apk add --update git && \
    yarn global add pm2

COPY package.json .
RUN yarn install

COPY . .

EXPOSE 7000

CMD ["pm2-docker", "bin/www"]