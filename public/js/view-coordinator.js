define(['models/app',
		'views/weekly-table-view',
        'views/sign-up-view',
        'views/sign-in-view'], 
	function(App, weeklyTableView, signUpView, signInView) {
		return {
			initialize: function(){
				App.getUser(function(user){
    				if (user){
    					weeklyTableView.initialize();
        			} 
        			else {
        				signUpView.initialize();
        				signInView.initialize();
        			}
        		});
			}
		}
	}
)