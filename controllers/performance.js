"use strict";

const performanceModel = require("../model/performance");
const { validatePageSize } = require("../lib/util");

const performance = {
	getPerformance: async (ctx, next) => {
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
	}
};

module.exports = performance;
