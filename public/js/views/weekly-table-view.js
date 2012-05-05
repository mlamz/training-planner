define(['jquery', 'underscore', 'backbone', 'router'], 
	function($, _, Backbone, router) {

	    return {
	        initialize: function() {
	        	var WeeklyTableView = Backbone.View.extend({
	        		el:$('#weekly-table'),
	        		initialize: function() {
	        		},
	        		events: {
	        			"click .weekly-table-day": "openDayOptions"
	        		},
	        		openDayOptions: function() {
	        			$('#day-options').fadeIn("fast");
	        		}
	        	});

	        	var weeklyTableView = new WeeklyTableView();
	        }
	    };

});