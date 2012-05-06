var Workout = require('../models/workout');

module.exports = 
{
    index : function index(req, res){
    	console.log("*********saving workout");
    	var workout = new Workout({  
    		type: req.body.type,
    		duration: req.body.duration,
    		date: req.body.date
    	});
    	workout.save(function(err) { 
    		console.log(err); 
    	});
    }
}