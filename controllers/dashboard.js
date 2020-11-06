"use strict";

const projectModel = require("../model/project");

const dashboard = {
	addNewProject: async (ctx, next) => {
		const { name, desc } = ctx.request.body;
		const newProject = new projectModel({
			name,
			desc
		});
		await newProject
			.save()
			.then(res => {
				ctx.result = {
					message: "success"
				};
			})
			.catch(err => {
				console.log(err);
			});
		return next();
	},
	haveProject: async (ctx, next) => {
		const data = await projectModel.find();

		ctx.result = data;
		return next();
	}
};

module.exports = dashboard;
