define(['jquery', 'underscore', 'backbone', 'router', 'models/workout', 'collections/workout-collection'], 
	function($, _, Backbone, router, Workout, WorkoutCollection) {

    	var DayOptionsView = Backbone.View.extend({
    		el:$('#day-options'),
    		initialize: function() {
                this.updateWorkouts();
    			this.render();
    		},
    		render: function(){
    			$(this.el).html($("#day-options-template").html());
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
               $("#workouts").html("");
                _(this.options.collection.models).each(function(workout){
                    var workoutDetails = { workout_type: workout.get('type'), workout_duration: workout.get('duration') }
                    ,   template = _.template( $("#day-options-workout-list-template").html(), workoutDetails );

                    if (workout.get('date') == this.options.date){
                        $("#workouts").append(template);
                    }
                }, this); 
            }
    	});

		return DayOptionsView;
});