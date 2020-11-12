const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
	pageUrl: {
		type: String,
		default: ""
	},
	url: {
		type: String,
		default: ""
	},
	time: {
		type: Number,
		default: 0
	},
	statusCode: {
		type: Number,
		default: 0
	},
	timeConsuming: {
		type: Number,
		default: 0
	},
	responseMsg: {
		type: String,
		default: ""
	}
});
module.exports = mongoose.model("Request", requestSchema);
