const mongoose = require('mongoose')

const database = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
	if (!err){
		console.log("MongoDB Connected")
	}
	else {console.log('Error : ' + err)}
})

module.exports= { database }