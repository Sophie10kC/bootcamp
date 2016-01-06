var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/~sophiecheong/Sites/bootcamp');

var db = mongoose.connection;
db.on('error', console.error.bind(
	console, 'connection error:')
);
db.once('open', function() {
	//connected
});
