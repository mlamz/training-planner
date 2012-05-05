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

require(['app', 'json2'], function(app) {
    app.initialize();
});

require(['date/custom-date-functions'], function(customDateFunctions){
	customDateFunctions.initialize();
});

require(['date/date-format', 'date/custom-date-functions', 'views/weekly-table-view'], function(dateFormat, customDateFunctions, weeklyTableView) {
    weeklyTableView.initialize();
});

require(['views/day-options-view'], function(dayOptionsView) {
    dayOptionsView.initialize();
});