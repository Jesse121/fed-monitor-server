"use strict";

const Router = require("koa-router");
const controllers = require("./controllers");
const router = new Router();
router.prefix("/api");

router.post("/users/register", controllers.users.register);
router.post("/users/login", controllers.users.login);
router.get("/users/logout", controllers.users.logout);
router.post("/users/info", controllers.users.info);

//获取已监控项目
router.get("/dashboard/haveProject", controllers.dashboard.haveProject);
// 新增监控项目
router.post("/dashboard/addNewProject", controllers.dashboard.addNewProject);

// 监控上报接口
router.post("/report", controllers.report);

//读取监控数据
router.get("/performance/getPagePerformance", controllers.performance.getPagePerformance);
router.get("/performance/getApiPerformance", controllers.performance.getApiPerformance);
router.get("/error/getErrorData", controllers.error.getErrorData);
router.get("/error/getErrorDetail", controllers.error.getErrorDetail);

module.exports = router;
