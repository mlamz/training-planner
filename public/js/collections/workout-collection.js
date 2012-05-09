define(['backbone', 'models/workout'], 
	function(Backbone, Workout) {

    	var WorkoutCollection = Backbone.Collection.extend({
    		model: Workout,
    		url: '/workout'
    	});
    	return WorkoutCollection;
    
    }
);