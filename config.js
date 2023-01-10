"use strict";
const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_NAME,
} = process.env;

const path = require("path");

module.exports = {
  port: 9000,
  secret: "demo", //生成token的密钥
  db: `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?authSource=admin`,
  logPath: path.resolve(__dirname, "./logs/koa.log"),
};
