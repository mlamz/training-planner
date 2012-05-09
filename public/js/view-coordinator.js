define(['models/app',
		'views/weekly-table-view',
        'views/sign-up-view'], 
	function(App, weeklyTableView, signUpView) {
		return {
			initialize: function(){
				App.getUser(function(user){
    				if (user){
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