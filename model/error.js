const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//定义数据类型
const errorSchema = new Schema({
	time: {
		type: Number,
		default: 0
	},
	type: {
		type: String,
		default: ""
	},
	data: {
		type: Object,
		default: {
			url: {
				type: String,
				default: ""
			},
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
