var Workout = require('../models/workout');

module.exports = 
{
    addWorkout : function addWorkout(req, res){
    	var workout = new Workout({  
    		type: req.body.type,
    		duration: req.body.duration,
    		date: req.body.date,
            userId: req.user._id
    	});
    	workout.save(function(err) { 
    		if (err != null){
                console.log(err);
            }; 
            res.send(workout);
    	});

    },
    deleteWorkout: function deleteWorkout(req, res){
        Workout.findById(req.params.id, function(err, workout){
            console.log(err);
            workout.remove();
            res.send(workout);
            
            
        });
    },
    findAllForUser: function findAllForUser(req, res, callback){
        Workout.find({ userId: req.user._id }, function(err, workouts){
            callback(workouts);
        });
    },
    findOneForUser: function findOneForUser(req, res, callback){
        Workout.findOne({ _id: req.params.id }, function(err, workout){
            callback(workout);
        })
    }
}