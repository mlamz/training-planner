define(['jquery', 
		'underscore', 
		'backbone', 
		'router', 
		'models/app',
		'date/date-format', 
		'date/custom-date-functions',
		'collections/workout-collection',
		'views/weekly-table-view',
        'views/sign-up-view'], 
	function($, _, Backbone, router, App, dateFormat, customDateFunctions, workoutCollection, weeklyTableView, signUpView) {
		return {
			initialize: function(){
				
				App.getUser(function(user){
    				if (user){
    					customDateFunctions.initialize();
    					weeklyTableView.initialize();
        			} 
        			else {
        			signUpView.initialize();
        			}
        		});
			}
		}
	}
)