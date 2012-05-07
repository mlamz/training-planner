define(['jquery', 'underscore', 'backbone', 'router', 'models/workout', 'collections/workout-collection'], 
	function($, _, Backbone, router, Workout, WorkoutCollection) {

    	var DayOptionsView = Backbone.View.extend({
    		el:$('#day-options'),
    		initialize: function() {
                this.updateWorkouts();
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
    		          })
                ,   self = this;
    			this.options.collection.add(workout);
                workout.save();

    			$('#day-options-add-workout-form').fadeOut("fast", function(){
    				self.updateWorkouts();
    			});
    		},
            updateWorkouts: function(){
                $('#day-options-add-workout-form').hide();
               $("#workouts").html("");
                _(this.options.collection.models).each(function(workout){
                    var workoutDetails = { workout_type: workout.get('type'), workout_duration: workout.get('duration') }
                    ,   template = _.template( $("#day-options-workout-list-template").html().replace(new RegExp('&lt;', 'g'),'<').replace(new RegExp('&gt;', 'g'),'>'), workoutDetails );
                    if (dateFormat(workout.get('date'), "mediumDate") == dateFormat(this.options.date, "mediumDate")){
                        $("#workouts").append(template);
                    }
                    
                }, this); 
            }
    	});

		return DayOptionsView;
});