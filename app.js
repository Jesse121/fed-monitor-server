"use strict";
require("dotenv").config();
const Koa = require("koa");
//解析post请求
const bodyParser = require("koa-bodyparser");
//引入mongoose数据库
const mongoose = require("mongoose");
const staticFiles = require("koa-static");
const path = require("path");
const config = require("./config");
const jwt = require("koa-jwt");
const router = require("./router");
const app = new Koa();
const { loggerMiddleware } = require("./middlewares/logger");
const { errorHandler, responseHandler } = require("./middlewares/response");

//对上报发送的数据单独处理
app.use(async function (ctx, next) {
  if (/^.*\/report\/.+$/.test(ctx.path)) {
    ctx.disableBodyParser = true;
  }
  await next();
});

//中间件
app.use(loggerMiddleware);
app.use(bodyParser());
app.use(errorHandler);

//注意 访问时不需要增加/public前缀
app.use(staticFiles(path.join(__dirname, "./public")));

//路由
app.use(router.routes()).use(router.allowedMethods());
// 排除验证token的路由
app.use(
  jwt({ secret: config.secret }).unless({
    path: [/\/login$/, /\/register$/, /\/report$/],
  })
);

// 定制相应内容
app.use(responseHandler);

console.log(config.db);

//连接数据库
mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("数据库连接成功");
    //监听端口
    app.listen(config.port, () => {
      console.log("服务端已开启: http://localhost:9000");
    });
  })
  .catch((err) => {
    console.log("数据库连接失败", err);
    process.exit();
  });
