"use strict";

const performanceModel = require("../model/performance");
const requestModel = require("../model/request");
const { validatePageSize } = require("../lib/util");

const performance = {
	getPagePerformance: async (ctx, next) => {
		const { page, pageSize } = validatePageSize(ctx.request.query);

		const total = await performanceModel.countDocuments();
		const hasNext = total - (page - 1) * pageSize > pageSize ? true : false;
		const result = await performanceModel
			.find()
			.limit(pageSize)
			.skip((page - 1) * pageSize);

		ctx.result = {
			total,
			hasNext,
			result
		};
		return next();
	},
	getApiPerformance: async (ctx, next) => {
		const { page, pageSize } = validatePageSize(ctx.request.query);

		const total = await requestModel.countDocuments();
		const hasNext = total - (page - 1) * pageSize > pageSize ? true : false;
		const result = await requestModel
			.find()
			.sort({ time: -1 })
			.limit(pageSize)
			.skip((page - 1) * pageSize);

		ctx.result = {
			total,
			hasNext,
			result
		};
		return next();
	}
};

module.exports = performance;
