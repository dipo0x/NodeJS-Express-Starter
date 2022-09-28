const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

var userData = new mongoose.Schema({
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	verification: {
		type : new mongoose.Schema({
		verified : {
					type: Boolean,
					required: true
					}
		////NIN, DOCUMENTS CAN COME IN HERE
		})
	}
})

module.exports = mongoose.model('User', userData)

module.exports.comparePassword = (candidatePassword, hash, callback)=>{
	bcryptjs.compare(candidatePassword, hash, (err, isMatch)=>{
		if(err) return callback(err)	
		callback(null, isMatch)
	})
}