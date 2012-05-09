define(['jquery', 'underscore', 'backbone', 'encoder','date/date-format', 'models/workout', 'views/add-workout-view'], 
	function($, _, Backbone, Encoder, dateFormatter, Workout, AddWorkoutView) {

    	var DayOptionsView = Backbone.View.extend({
    		el:$('#day-options'),
    		initialize: function() {
                this.render();
    		},
    		events: {
    			"click .close-button": "close",
    			"click #add-workout" : "showAddWorkoutForm",
                "click button.delete-workout" : "deleteWorkout"
    		},
    		close: function() {
                if(this.addWorkoutView != null){ 
                    this.addWorkoutView.el.unbind();
                }
                $('#day-options').fadeOut("fast");
		        $(this.el).unbind();
                this.options.parentView.populateCalendarWorkouts();
    		},
    		showAddWorkoutForm: function(){
                if (!this.addWorkoutView){
                    this.addWorkoutView = new AddWorkoutView({ collection: this.options.collection, parentView: this, date: this.options.date });
                }
                this.addWorkoutView.el.show();
    		},
            deleteWorkout: function(e){
                var workoutId = $(e.currentTarget).parent().attr("data-workout-id")
                ,   self = this
                ,   workout = new Workout({_id: workoutId});

                workout.fetch({
                    success: function(workout, response){
                        if (workout != null){
                            workout.destroy({
                                success: function(model, response) {
                                    self.options.collection.remove(model);
                                    self.render();
                                },
                                error: function(model, response){
                                    console.log("error deleting", model, response)
                                }
                            });
                        }
                     }
                });
            },
            render: function(){
                $('#day-options-add-workout-form').hide();
                $("#workouts").html("");
                console.log("rendering day options");
               var workouts = _.filter(this.options.collection.models, function (model){
                    return dateFormat(model.get('date'), "mediumDate") === dateFormat(this.options.date, "mediumDate");
               }, this);

               if (workouts.length == 0){
                    $("#day-options-control-no-workouts-message").show();
               }
               else {
                    $("#day-options-control-no-workouts-message").hide();
               }

                _(workouts).each(function(workout){
                    var workoutDetails = { workout_type: workout.get('type'), workout_duration: workout.get('duration'), workout_id: workout.get('_id') }
                    ,   template = _.template(Encoder.htmlDecode($("#day-options-workout-list-template").html()), workoutDetails );
                    
                    $("#workouts").append(template);
                }, this); 
            }
    	});

		return DayOptionsView;
});