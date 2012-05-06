define(['jquery', 'underscore', 'backbone', 'router', 'models/workout', 'collections/workout-collection'], 
	function($, _, Backbone, router, Workout, WorkoutCollection) {

    	var DayOptionsView = Backbone.View.extend({
    		el:$('#day-options'),
    		initialize: function() {
			  	this.bind("click", this.render, this);
    			this.render();
    		},
    		render: function(){
    			$("#workouts").html("");
    			_(this.options.collection.models).each(function(workout){
					if (workout.get('date') == this.options.date){
						$("#workouts").append("<li class='workout-item'>" + workout.get('type') + ", " + workout.get('duration') + "hrs</li>");	
					}
				}, this);
    		},
    		events: {
    			"click .close-button": "close",
    			"click #add-workout" : "showAddWorkoutForm",
    			"click #submit-workout" : "submitWorkout"
    		},
    		close: function() {
    			$('#day-options').fadeOut("fast");
		        $(this.el).unbind();
                this.options.parentView.populateCalendarWorkouts();
    		},
    		showAddWorkoutForm: function(){
    			$('#day-options-add-workout-form').fadeIn("fast");
    		},
    		submitWorkout: function(){
    			var workout = new Workout({
    				type : $("select#workout-type").val(),
    				duration: $("select#workout-duration").val(),
    				date: this.options.date
    			});
    			this.options.collection.add(workout);

    			var self = this;
    			$('#day-options-add-workout-form').fadeOut("fast", function(){
    				self.render();
    			});
    		}
    	});

		return DayOptionsView;


});