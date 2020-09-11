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

module.exports = router;
