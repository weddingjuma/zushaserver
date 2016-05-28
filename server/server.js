'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var app = module.exports = loopback();
var env = require('get-env')({
  test: 'test'
});
var require('dotenv').config();

//init pesapaljs
/**
var PesaPal = require('pesapaljs').init({
    key: "s9wWRUjVSuzqvZIoVDzxOsjgNdmWwoAR",
    secret: "fe9iGVCH8YkJGL9G5V1epBh7zrQ=",
    debug: true // false in production!
}); **/

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --


// boot scripts mount components like REST API
boot(app, __dirname);


// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:

var staticPath = null;

if (env !== 'prod') {
  staticPath = path.resolve(__dirname, '../client/app/');
  console.log("Running app in development mode");
} else {
  staticPath = path.resolve(__dirname, '../dist/');
  console.log("Running app in production mode");
}

app.use(loopback.static(staticPath));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
