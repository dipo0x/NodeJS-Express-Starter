const seeders = require('./seeders.config')
const mongoose = require('mongoose')

const database = mongoose.connect(seeders.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
	if (!err){
		console.log("MongoDB Connected")
	}
	else {console.log('Error : ' + err)}
})

module.exports= { database }