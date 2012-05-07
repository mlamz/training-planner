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
			'collections/workout-collection', 
			'views/weekly-table-view'
		], 
		function(dateFormat, customDateFunctions, workoutCollection, weeklyTableView) {
		    customDateFunctions.initialize();
		    weeklyTableView.initialize();
		});