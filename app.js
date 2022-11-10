var express = require('express');
var toobusy_js = require("toobusy-js");
var apiErrorHandler = require('./error/ApiErrorHandler')
var apiError = require('./error/ApiError')
var postRouter = require('./routes/post.route.js');
var accountRouter = require('./routes/account.route.js');
const AdminBro = require('admin-bro')
var cors = require('cors')
const adminBroExpress = require('@admin-bro/express')
const adminBroMongoose = require('@admin-bro/mongoose')
var { database } = require('./config/mongodb.config')
const seeders = require('./config/seeders.config')
const User = require('./models/user.model')
const server = require('./server')

var app = express();

app.use(cors({
  origin: '*'
}));

AdminBro.registerAdapter(adminBroMongoose)

const adminBro = new AdminBro ({
  Databases: [ database ],
  rootPath: '/admin',
  resources: [ User ]
})
const adminRouter = adminBroExpress.buildRouter (adminBro)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.disable("x-powered-by");
if(toobusy_js){
	apiError.badRequest("Server is busy.")
}

app.use('/post', postRouter);
app.use('/account', accountRouter);
app.use(adminBro.options.rootPath, adminRouter)
app.use(apiErrorHandler)

app.use(function (req, res, next) {
	return res.status(404).json("Page not found")
})

app.use(function (err, req, res, next) {
	return res.status(500).json("Something went wrong")
});

server()

module.exports = app;