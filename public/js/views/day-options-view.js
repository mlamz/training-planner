define(['jquery', 'underscore', 'backbone', 'router', 'models/workout', 'collections/workout-collection'], 
	function($, _, Backbone, router, Workout, WorkoutCollection) {

	    return {
	        initialize: function() {
	        	var DayOptionsView = Backbone.View.extend({
	        		el:$('#day-options'),
	        		initialize: function() {
	        			this.collection = new WorkoutCollection();
	        			this.render();
	        		},
	        		render: function(){
	        			console.log(this.collection);
	        			console.log("rendering day options");
	        		},
	        		events: {
	        			"click .close-button": "close"
	        		},
	        		close: function() {
	        			$('#day-options').fadeOut("fast");
	        		}
	        	});

	        	var dayOptionsView = new DayOptionsView();
	        }
	    };

});