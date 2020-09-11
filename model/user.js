const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//定义数据类型
const userSchema = new Schema({
	userId: {
		type: Number,
		default: 0,
		require: true
	},
	username: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	roles: {
		type: Array,
		require: true
	},
	avatar: {
		type: String,
		default: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
	},
	introduction: {
		type: String,
		default: ""
	},
	date: {
		type: Date,
		default: Date
	}
});
//基于数据结构创建一个叫User的表(首字母大写) 数据库中自动生成叫users
module.exports = mongoose.model("User", userSchema);
