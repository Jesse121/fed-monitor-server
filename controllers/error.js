"use strict";

const errorModel = require("../model/error");
const { validatePageSize } = require("../lib/util");
const { readFileSync } = require("fs");
const { SourceMapConsumer } = require("source-map");
const ErrorStackParser = require("error-stack-parser");

const error = {
	getErrorData: async (ctx, next) => {
		const { page, pageSize } = validatePageSize(ctx.request.query);

		const total = await errorModel.countDocuments();
		const hasNext = total - (page - 1) * pageSize > pageSize ? true : false;
		const result = await errorModel
			.find()
			.sort({ time: -1 }) // 按时间倒序排列输出
			.limit(pageSize)
			.skip((page - 1) * pageSize);

		ctx.result = {
			total,
			hasNext,
			result
		};
		return next();
	},

	getErrorDetail: async (ctx, next) => {
		const { id } = ctx.request.query;
		const [result] = await errorModel.find({ _id: id });
		// source-map分析拿到错误源文件及行列信息
		if (result.data.stack) {
			const stackDetail = ErrorStackParser.parse(result.data);
			const index = stackDetail[0].fileName.indexOf("/js/");
			const filePath = stackDetail[0].fileName.slice(index + 4);
			// 读取对应的map文件
			const rawSourceMap = JSON.parse(readFileSync(`./public/${result.projectName}-map/${filePath}.map`, "utf8"));
			SourceMapConsumer.with(rawSourceMap, null, consumer => {
				const pos = consumer.originalPositionFor({
					line: stackDetail[0].lineNumber,
					column: stackDetail[0].columnNumber
				});

				result.data.source = pos.source;
				result.data.col = pos.column;
				result.data.line = pos.line;
			});
		}
		ctx.result = {
			result
		};
		return next();
	}
};

module.exports = error;
