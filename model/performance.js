const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//定义数据类型
const performanceSchema = new Schema({
	url: {
		type: String,
		default: ""
	},
	dnst: {
		type: Number,
		default: 0
	},
	tcpt: {
		type: Number,
		default: 0
	},
	wit: {
		type: Number,
		default: 0
	},
	domt: {
		type: Number,
		default: 0
	},
	lodt: {
		type: Number,
		default: 0
	},
	radt: {
		type: Number,
		default: 0
	},
	rdit: {
		type: Number,
		default: 0
	},
	uodt: {
		type: Number,
		default: 0
	},
	reqt: {
		type: Number,
		default: 0
	},
	andt: {
		type: Number,
		default: 0
	}
});
//基于数据结构创建一个叫User的表(首字母大写) 数据库中自动生成叫users
module.exports = mongoose.model("Performance", performanceSchema);
