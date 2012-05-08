define(['jquery', 'underscore', 'backbone', 'router'], 
	function($, _, Backbone, router, Encoder, Workout, WorkoutCollection, DayOptionsView) {
		return {
			initialize: function(){
				var SignUpView = Backbone.View.extend({
					initialize: function(){
						console.log("sign up view initialised");
					}
				});
			}
		}
	}
)