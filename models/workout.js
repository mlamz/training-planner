var mongoose = require('mongoose')
,	Workout = new mongoose.Schema({
		type: String,
		duration: Number,
		date: Date,
		userId: String
});

mongoose.model('Workout', Workout);
var Workout = mongoose.model('Workout');

module.exports = Workout;