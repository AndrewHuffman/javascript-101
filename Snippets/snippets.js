
/* Mongo DB Snippets */
var stateToPopMap = function() { emit(this.state, this.pop) }
var reducePop = function(state, pop) { return Array.sum(pop) }
db.zips.mapReduce(stateToPopMap, reducePop, { out: 'state_to_pop' });
db.state_to_pop.find().toArray().map(function(state){return state.value}).reduce(function(prev, curr) { return prev + curr })