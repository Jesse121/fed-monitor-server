"use strict";

const coBody = require("co-body");
const performanceModel = require("../model/performance.js");
const errorModel = require("../model/error.js");
const requestModel = require("../model/request.js");

const report = async (ctx, next) => {
	const params = await coBody.json(ctx.request);
	// 获取报错的项目名称
	const projectName = ctx.request.query.name;
	// 获取客户端平台
	const platform = params.platform;
	const UA = params.UA;
	const pageUrl = params.url;

	// console.log("performance", params.performance);
	// console.log("errorList", params.errorList);
	// console.log("requestList", params.requestList);

	if (params.performance) {
		// 获取页面性能数据
		const { dnst, tcpt, wit, domt, lodt, radt, rdit, uodt, reqt, andt } = params.performance;
		//将性能数据存储到数据库
		const newPerformance = new performanceModel({
			url: pageUrl,
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
			.then(() => {
				ctx.result = {
					message: "success"
				};
			})
			.catch(err => {
				console.log(err);
			});
	}

	// 获取页面错误数据
	const errorList = params.errorList;
	// 将错误数据存入数据库
	if (errorList.length > 0) {
		const errorData = errorList.map(
			item =>
				new errorModel({
					projectName,
					platform,
					useragent: UA,
					time: new Date().getTime(),
					type: item.type,
					url: pageUrl,
					data: item.data
				})
		);
		await errorModel
			.insertMany(errorData)
			.then(() => {
				ctx.result = {
					message: "success"
				};
			})
			.catch(err => {
				console.log(err);
			});
	}

	const requestList = params.requestList;
	if (requestList.length > 0) {
		const requestData = requestList.map(
			item =>
				new requestModel({
					pageUrl,
					url: item.url,
					time: new Date().getTime(),
					statusCode: item.statusCode,
					timeConsuming: item.timeConsuming,
					responseMsg: item.responseMsg
				})
		);
		await requestModel
			.insertMany(requestData)
			.then(() => {
				ctx.result = {
					message: "success"
				};
			})
			.catch(err => {
				console.log(err);
			});
	}
	return next();
};

module.exports = report;
