define(['jquery', 'underscore', 'backbone', 'router'], 
	function($, _, Backbone, router) {
    	var Workout = Backbone.Model.extend({
    		initialize: function(){
				console.log("Workout model loaded");
    		}
    	});

    	return Workout;
	}
);