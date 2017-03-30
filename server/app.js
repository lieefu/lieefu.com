//https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli#conclusion

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Get dependencies
const express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Get our API routes
const routes = require('./routes');

const app = express();
var server = require('http').createServer(app);
require('./config/express')(app);

// Set our api routes
app.use('/',routes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

/// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
