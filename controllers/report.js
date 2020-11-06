"use strict";

// const { sign } = require("jsonwebtoken");
// const config = require("../config");
// const userModel = require("../model/user");
// const counterModel = require("../model/counter");
const performanceModel = require("../model/performance.js");
const errorModel = require("../model/error.js");

const report = async (ctx, next) => {
	// 获取页面性能数据
	const { dnst, tcpt, wit, domt, lodt, radt, rdit, uodt, reqt, andt } = ctx.request.body.performance;
	// 获取页面错误数据
	const errorList = ctx.request.body.errorList;
	//将性能数据存储到数据库
	const newPerformance = new performanceModel({
		url: ctx.request.body.url,
		dnst,
		tcpt,
		wit,
		domt,
		lodt,
		radt,
		rdit,
		uodt,
		reqt,
		andt
	});
	await newPerformance
		.save()
		.then(user => {
			ctx.result = {
				message: "success"
			};
		})
		.catch(err => {
			console.log(err);
		});

	// 将错误数据存入数据库
	errorList.length >= 1 &&
		errorList.forEach(async item => {
			const newErrorData = new errorModel({
				time: item.time,
				type: item.type,
				data: item.data
			});
			await newErrorData
				.save()
				.then(user => {
					ctx.result = {
						message: "success"
					};
				})
				.catch(err => {
					console.log(err);
				});
		});

	return next();
};

module.exports = report;
