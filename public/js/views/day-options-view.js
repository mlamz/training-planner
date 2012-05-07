define(['jquery', 'underscore', 'backbone', 'router', 'encoder', 'models/workout', 'collections/workout-collection'], 
	function($, _, Backbone, router, Encoder, Workout, WorkoutCollection) {

    	var DayOptionsView = Backbone.View.extend({
    		el:$('#day-options'),
    		initialize: function() {
                this.updateWorkouts();
    		},
    		events: {
    			"click .close-button": "close",
    			"click #add-workout" : "showAddWorkoutForm",
    			"click #submit-workout" : "submitWorkout",
                "click button.delete-workout" : "deleteWorkout"
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
    			
                workout.save({},
                    {
                        success: function(model, response){
                            self.options.collection.add(workout);
                            self.options.collection.fetch({
                                success: function(){
                                    $('#day-options-add-workout-form').fadeOut("fast", function(){
                                        self.updateWorkouts();
                                    });
                                }
                            });
                        },
                        error: function(model, response){ console.log("model error", model, "response", response);}
                    });
    			
    		},
            deleteWorkout: function(e){
                var workoutId = $(e.currentTarget).parent().attr("data-workout-id")
                ,   self = this;

                _(this.options.collection.models).each(function(workout){
                    if (workout.get('_id') == workoutId){
                        workout.destroy({success: function(model, response) {
                            self.updateWorkouts();
                        },
                        error: function(model, response){
                            console.log("error deleting workout", model, response);
                        }});
                    }
                });
            },
            updateWorkouts: function(){
                $('#day-options-add-workout-form').hide();
               $("#workouts").html("");
                _(this.options.collection.models).each(function(workout){

                    var workoutDetails = { workout_type: workout.get('type'), workout_duration: workout.get('duration'), workout_id: workout.get('_id') }
                    ,   template = _.template(Encoder.htmlDecode($("#day-options-workout-list-template").html()), workoutDetails );
                    
                    if (dateFormat(workout.get('date'), "mediumDate") == dateFormat(this.options.date, "mediumDate")){
                        $("#workouts").append(template);
                    }
                    
                }, this); 
            }
    	});

		return DayOptionsView;
});