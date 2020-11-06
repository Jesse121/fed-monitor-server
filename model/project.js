const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
	name: {
		type: String,
		default: ""
	},
	desc: {
		type: String,
		default: ""
	}
});
module.exports = mongoose.model("Project", projectSchema);
