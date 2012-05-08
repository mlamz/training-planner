define(['jquery', 'underscore', 'backbone', 'router', 'encoder', 'models/workout', 'collections/workout-collection'], 
	function($, _, Backbone, router, Encoder, Workout, WorkoutCollection) {

        var AddWorkoutView = Backbone.View.extend({
            el: $('#day-options-add-workout-form'),
            initialize: function(){
                $(this.el).show();
                
                console.log("add workout view loaded");
            },
            events: {
                "click #submit-workout" : "submitWorkout"
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
                                    $('#day-options-add-workout-form').hide(function(){
                                        self.options.parentView.render();
                                    });
                                }
                            });
                        },
                        error: function(model, response){ console.log("model error", model, "response", response);}
                    });
            }
        });
		return AddWorkoutView;
});