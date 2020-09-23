"use strict";

const Router = require("koa-router");
const controllers = require("./controllers");
const router = new Router();
router.prefix("/api");

// router.use(jwtMiddleware);

router.post("/users/register", controllers.user.register);
router.post("/users/login", controllers.user.login);
router.get("/users/logout", controllers.user.logout);
router.post("/users/info", controllers.user.info);

// 监控上报接口
router.post("/report", controllers.report);

//读取监控数据
router.get("/performance/getPerformance", controllers.performance.getPerformance);
router.get("/getError", controllers.error);
module.exports = router;
