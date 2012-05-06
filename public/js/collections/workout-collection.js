define(['jquery', 'underscore', 'backbone', 'router', 'models/workout'], 
	function($, _, Backbone, router, Workout) {

    	var WorkoutCollection = Backbone.Collection.extend({
    		model: Workout,
    		url: '/workouts'
    	});
    	return WorkoutCollection;
    
    }
);