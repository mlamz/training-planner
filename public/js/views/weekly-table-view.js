define(['jquery', 'underscore', 'backbone', 'router'], 
	function($, _, Backbone, router) {

	    return {
	        initialize: function() {
	        	var WeeklyTableView = Backbone.View.extend({
	        		el:$('#weekly-table'),
	        		initialize: function() {
	        			var today = new Date()
	        			,	firstJan = new Date(new Date().getFullYear(),0,1)
	        			,	firstSunday = firstJan.getDay()
	        			,	todaysDayElement;

	        			$(".weekly-table-day").each(function(){
	        				var dataDayValue = $(this).attr('data-day');
	        				var daysToAdd = parseInt(dataDayValue) + (-1 * firstSunday - 1);
	        				var dateOfThisDay = firstJan.addDays(daysToAdd);
	        				$(this).attr('data-date', dateOfThisDay);
	        				$(this).children(".date").html(dateFormat(dateOfThisDay, "mmmm d"));
	        			});

	        			todaysDayElement = $(".weekly-table-day[data-date*='" + dateFormat(today, "mmmm dd") +"']");
	        			console.log("today's day element", todaysDayElement);
	        			todaysDayElement.addClass("today");


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