require.config({
    paths: {
        jquery:     'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone:   'libs/backbone/backbone',
        text:       'libs/require/text',
        json2:      'libs/json/json2',
        templates:   '../templates'
    }

});

require([	'date/date-format', 
			'date/custom-date-functions', 
			'models/workout', 
			'collections/workout-collection', 
			'views/weekly-table-view'
		], 
		function(dateFormat, customDateFunctions, workoutModel, workoutCollection, weeklyTableView) {
		    customDateFunctions.initialize();
		    weeklyTableView.initialize();
		});