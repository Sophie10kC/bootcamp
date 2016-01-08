/*
	EXPRESS STUFF
	=============
*/
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
routes = require('./routes');
var engines = require('consolidate');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // get information from html forms
app.use(cookieParser());
app.use(session({ secret : 'somesecret',
					resave: false,
					saveUninitialized: true,
					cookie: { expires: false } 
				}));

app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));

app.get('/public', routes.index);



/*
	MONGOOSE STUFF
	==============
*/
var mongoose = require('mongoose');
mongoose.set('debug, true');
mongoose.connect('mongodb://192.168.99.100:27017/bootcamp1');
mongoose.connection.on('error', console.error.bind(console, 'DB connection error.'));
mongoose.connection.once('open', console.log.bind(console, 'DB Connection established.'));

/*
	API STUFF
	=========
*/
api = require('./routes/api')(app);

var server = app.listen(27017, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Express server listening on port ", port, host);

});

