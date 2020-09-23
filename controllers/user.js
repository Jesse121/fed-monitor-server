"use strict";

const jsonwebtoken = require("jsonwebtoken");
const config = require("../config");
const userModel = require("../model/user");
const counterModel = require("../model/counter");

const user = {
	login: async (ctx, next) => {
		const username = ctx.request.body.username;
		const findResult = await userModel.find({ username });
		if (findResult.length == 0) {
			ctx.status = 404;
			ctx.body = {
				status: 404,
				message: "用户不存在"
			};
		} else {
			//验证密码是否正确
			const result = await userModel.find({ username, password: ctx.request.body.password });
			const token = jsonwebtoken.sign({ username }, config.secret, { expiresIn: 36000 });

			if (result.length > 0) {
				//返回用户信息
				ctx.result = {
					accessToken: token,
					userId: result[0].userId
				};
			} else {
				ctx.status = 400;
				ctx.body = {
					status: 400,
					message: "密码错误"
				};
			}
		}
		return next();
	},
	register: async (ctx, next) => {
		const findResult = await userModel.find({
			email: ctx.request.body.email
		});
		//判断是否存在该用户
		if (findResult.length > 0) {
			//状态码
			ctx.status = 400;
			ctx.body = {
				status: 400,
				message: "邮箱已经被占用"
			};
		} else {
			// 获取自增id
			const userId = await counterModel.findOneAndUpdate(
				{ des: "userIdGenerator" },
				{ $inc: { id: 1 } },
				{
					new: true,
					upsert: true
				}
			);
			//存储到数据库
			const newUser = new userModel({
				userId: userId.id,
				roles: ctx.request.body.roles,
				password: ctx.request.body.password,
				username: ctx.request.body.username,
				email: ctx.request.body.email
			});
			//返回给客户端 一定要await 否则会返回Not Found
			await newUser
				.save()
				.then(user => {
					// console.log(user);
					ctx.status = 200;
					ctx.body = {
						status: 200,
						message: "注册成功",
						userInfo: user
					};
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	logout: (ctx, next) => {
		ctx.result = {
			code: 20000,
			message: true
		};
		return next();
	},
	info: async (ctx, next) => {
		const result = await userModel.find({ userId: ctx.request.body.userId });
		ctx.result = {
			user: result[0]
		};
		return next();
	}
};

module.exports = user;
