define(['jquery', 'underscore', 'backbone', 'router'], 
	function($, _, Backbone, router) {
    	var Workout = Backbone.Model.extend({
    		urlRoot: '/workouts',
    		initialize: function(){
    		}
    	});

    	return Workout;
	}
);