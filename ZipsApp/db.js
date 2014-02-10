var MongoClient = require('mongodb').MongoClient,
	format 		= require('util').format;

/* Module definition. Scopes the find methods */
var ZipsDB = {
	/* MongoDB collection object */
	collection: null,

	/* Retrieve all zipcodes. Limit to limit if defined.  */
	find: function(next, limit) {
		this._query({}, next, limit);
	},

	findBy: function(query, next, limit) {
		this._query(query, next, limit);
	},

	_query: function(query, next, limit) {
		var options = {};
		if (limit) { options.limit = limit; }
		this.collection.find(query, options).toArray(this._cb(next));
	},

	_cb: function(next) {
		return function(err, results) {
			console.log("DB Response");
			var response = {
				success: true,
				errorMessage: "",
				error: err,
				results: []
			};

			if (err) {
				console.error(err.stack);
				response.success = false;
				response.errorMessage = "Unable to communicate with DB";
			} else {
				response.results = results;
			}

			console.dir(response);
			next(response);
		}
	}
}

MongoClient.connect('mongodb://localhost:27017/example',
	function(err, db) {
		console.log("DB connected");

		if (err) {
			console.error(err.stack);
			console.log("DB Error.");
		}

		ZipsDB.collection = db.collection("zips");
	}
);

/*
	TODO: Fix potential race condition issue with db connection initialization
*/
module.exports.Model = {};
module.exports.Model.ZipsDB = ZipsDB;