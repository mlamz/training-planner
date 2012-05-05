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
	        			"click .close-button": "close",
	        			"click #add-workout" : "showAddWorkoutForm"
	        		},
	        		close: function() {
	        			$('#day-options').fadeOut("fast");
	        		},
	        		showAddWorkoutForm: function(){
	        			$('#day-options-add-workout-form').fadeIn("fast");
	        		}
	        	});

	        	var dayOptionsView = new DayOptionsView();
	        }
	    };

});