define(['jquery', 'underscore', 'backbone', 'router'], 
	function($, _, Backbone, router) {

	    return {
	        initialize: function() {
	        	var WeeklyTableView = Backbone.View.extend({
	        		el:$('#weekly-table'),
	        		initialize: function() {
	        			var today = new Date()
	        			,	firstJan = new Date(new Date().getFullYear(),0,1)
	        			,	firstSunday = firstJan.getDay();

	        			$(".weekly-table-day").each(function(){
	        				var dataDayValue = $(this).attr('data-day');
	        				var daysToAdd = parseInt(dataDayValue) + (-1 * firstSunday - 1);
	        				$(this).attr('data-date', (firstJan.addDays(daysToAdd)));
	        			});

	        		},
	        		events: {
	        			"click .weekly-table-day": "openDayOptions"
	        		},
	        		openDayOptions: function(e) {
	        			var date = new Date(Date.parse($(e.currentTarget).attr('data-date')));
	        			$("#day-options-date").html(dateFormat(date, "dddd, mmmm dS, yyyy"));
	        			$('#day-options').fadeIn("fast");
	        		}
	        	});

	        	var weeklyTableView = new WeeklyTableView();
	        }
	    };

});