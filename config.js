"use strict";

const path = require("path");

module.exports = {
	port: 9000,
	secret: "demo", //生成token的密钥
	db: "mongodb://localhost:27017/fed-monitor",
	logPath: path.resolve(__dirname, "./logs/koa.log")
};
