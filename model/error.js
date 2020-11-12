const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//定义数据类型
const errorSchema = new Schema({
	projectName: {
		type: String,
		default: ""
	},
	platform: {
		type: String,
		default: ""
	},
	useragent: {
		type: String,
		default: ""
	},
	time: {
		type: Number,
		default: 0
	},
	type: {
		type: String,
		default: ""
	},
	url: {
		type: String,
		default: ""
	},
	data: {
		type: Object,
		default: {
			msg: {
				type: String,
				default: ""
			},
			stack: {
				type: String,
				default: ""
			}
		}
	}
});
module.exports = mongoose.model("Error", errorSchema);
