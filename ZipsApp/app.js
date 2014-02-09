var express = require('express');
var zipsdb  = require('./db.js');

var app = express();

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.send(500, 'Unknown server error.');
});

function dbResponseHandler(res) {
	return function(dbres) {
		if (!dbres.success) {
			res.send(500, dbres.errorMessage);
		} else {
			res.send(200, dbres.results);
		}
	}
}

app.get("/zips", function(req, res) {
	var limit = req.query.limit || 0;

	zipsdb.find(dbResponseHandler(res), limit);
});

app.get("/zips/:state", function(req, res) {
	var limit = req.query.limit || 0,
		state = req.params.state;

	zipsdb.findBy({state:state}, dbResponseHandler(res), limit);
});

app.listen(8888);