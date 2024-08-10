FROM node:alpine

WORKDIR /usr/src/app

COPY . .

COPY ./Docker/postgres/init.sql /docker-entrypoint-initdb.d/

WORKDIR /usr/src/app/apis

RUN npm install

# CMD ["node", "cron-jobs/news.js"]

ENTRYPOINT ["node", "server.js"]

EXPOSE 3000


