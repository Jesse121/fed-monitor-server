FROM node:17.3.0-alpine

WORKDIR /app

COPY package.json .
RUN npm i --registry=http://registry.npmmirror.com && npm cache --force clean
COPY . .


CMD ["node", "app.js"]
