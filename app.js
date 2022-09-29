var express = require('express');
var toobusy_js = require("toobusy-js");
const http = require('http')
var apiErrorHandler = require('./error/ApiErrorHandler')
var apiError = require('./error/ApiError')
var indexRouter = require('./routes/index.route.js');
var accountRouter = require('./routes/account.route.js');
const AdminBro = require('admin-bro')
var cors = require('cors')
const adminBroExpress = require('@admin-bro/express')
const adminBroMongoose = require('@admin-bro/mongoose')
var { database } = require('./config/mongodb.config')
const seeders = require('./config/seeders.config')
const User = require('./models/user.model')

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

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use(adminBro.options.rootPath, adminRouter)
app.use(apiErrorHandler)

app.use(function (req, res, next) {
	return res.status(404).json("Page not found")
})

app.use(function (err, req, res, next) {
	return res.status(500).json("Something went wrong")
});

var port = seeders.PORT
var server = http.createServer(app);
server.listen(port, (err) => {
  if (err) { console.log(err)}
  else {
    console.log(`Server is running on port ${port}`)
  }
});

module.exports = app;