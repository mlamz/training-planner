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
			'views/weekly-table-view',
			'views/day-options-view'
		], 
		function(dateFormat, customDateFunctions, workoutModel, workoutCollection, weeklyTableView, dayOptionsView) {
		    customDateFunctions.initialize();
		    weeklyTableView.initialize();
		    dayOptionsView.initialize();
		});