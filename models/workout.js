var mongoose = require('mongoose')
,	Workout = new mongoose.Schema({
		type: String,
		duration: Number,
		date: Date 
});

mongoose.model('Workout', Workout);
var Workout = mongoose.model('Workout');

module.exports = Workout;