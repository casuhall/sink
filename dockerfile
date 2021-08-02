FROM node:latest

WORKDIR /app

COPY ["package.json", "package-lock.json*", "index.js", "./"]

RUN npm install --production

CMD [ "node", "index.js" ]

EXPOSE 8080 8081
