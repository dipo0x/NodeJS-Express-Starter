const seeders = require('./config/seeders.config');
const http = require('http');
const express = require('express');

var app = express();
var port = seeders.PORT
var server = http.createServer(app);


module.exports = async function() {
	server.listen(port, (err) => {
	  if (err) { console.log(err)}
	  else {
	    console.log(`Server is running on port ${port}`)
	  }
	});
}