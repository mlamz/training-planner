var Workout = require('../models/workout');

module.exports = 
{
    addWorkout : function addWorkout(req, res){
    	var workout = new Workout({  
    		type: req.body.type,
    		duration: req.body.duration,
    		date: req.body.date
    	});
    	workout.save(function(err) { 
    		if (err != null){
                console.log(err);
            }; 
            res.send(workout);
    	});

    },
    findAll: function findAll(callback){
        Workout.find({}, function(err, workouts){
            callback(workouts);
        });
    }
}