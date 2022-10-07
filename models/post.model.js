const mongoose = require('mongoose')

var postData = new mongoose.Schema({
	title: {
		type: String,
	},
	body: {
		type: String,
	},
    slug: {
		type: String,
	},
    timeStamp: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Post', postData)