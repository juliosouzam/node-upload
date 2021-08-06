FROM node:lts-alpine

ENV PORT=3000

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

VOLUME ["/app/tmp"]

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]