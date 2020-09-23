"use strict";

const errorModel = require("../model/error");
const { validatePageSize } = require("../lib/util");

const error = async (ctx, next) => {
	const { page, pageSize } = validatePageSize(ctx.request.query);

	const total = await errorModel.countDocuments();
	const hasNext = total - (page - 1) * pageSize > pageSize ? true : false;
	const result = await errorModel
		.find()
		.limit(pageSize)
		.skip((page - 1) * pageSize);

	ctx.result = {
		total,
		hasNext,
		result
	};
	return next();
};

module.exports = error;
