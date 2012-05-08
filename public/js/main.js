require.config({
    paths: {
        jquery:     'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone:   'libs/backbone/backbone',
        text:       'libs/require/text',
        json2:      'libs/json/json2',
        encoder: 	"libs/encoder/encoder", 
        templates:   '../templates'
    }

});

require([	'date/date-format', 
			'date/custom-date-functions',
            'models/app', 
			'collections/workout-collection',
			'views/weekly-table-view',
            'views/sign-up-view'
		], 
		function(dateFormat, customDateFunctions, app, workoutCollection, weeklyTableView, signUpView) {
		    customDateFunctions.initialize();
            app.initialize();
            signUpView.initialize();
		    weeklyTableView.initialize();
            
		});