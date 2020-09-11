const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//定义数据类型
const counterSchema = new Schema({
	id: {
		type: Number,
		default: 0
	},
	des: {
		type: String,
		require: true,
		default: "userIdGenerator"
	}
});
//基于数据结构创建一个叫User的表(首字母大写) 数据库中自动生成叫users
module.exports = mongoose.model("Counter", counterSchema);
