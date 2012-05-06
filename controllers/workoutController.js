var Workout = require('../models/workout');

module.exports = 
{
    index : function index(req, res){
    	var workout = new Workout({  
    		type: req.body.type,
    		duration: req.body.duration,
    		date: req.body.date
    	});
    	workout.save(function(err) { 
    		console.log(err); 
    	});
    },
    findAll: function findAll(callback){
        console.log("****FETCHING WORKOUTS******");
        Workout.find({}, function(err, workouts){
            console.log("****FOUND WORKOUTS******", workouts);
            callback(workouts);
        });
    }
}