define(['spec/workoutSpec'], 
	function(workoutSpec) {
		return {
			initialize: function(){
				jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
  				jasmine.getEnv().execute();
			}
		}
	}
)