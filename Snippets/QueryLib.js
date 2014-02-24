var movieQuery = Movies.getQuery();
movieQuery.where("totalCost").greaterThan(1000000000).and("profit").lessThan(0).get();
//http://docs.mongodb.org/manual/reference/operator/query/

"/v1/movies?op1=gt&totalCost=1000000000&op2=lt&profit=0"

function Query(type) {
	
	this.get = function() {

	}

	this.where = function() {

	}

	this.greaterThan = function() {

	}

	this.lessThan = function() {

	}

	this.and = function() {

	}
}