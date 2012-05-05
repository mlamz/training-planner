define(['jquery', 'underscore', 'backbone', 'router', 'models/workout', 'collections/workout-collection', 'views/day-options-view'], 
	function($, _, Backbone, router, Workout, WorkoutCollection, DayOptionsView) {

	    return {
	        initialize: function() {
	        	var WeeklyTableView = Backbone.View.extend({
	        		el:$('#weekly-table'),

	        		initialize: function() {
	        			var today 		= new Date()
	        			,	thisYear 	= new Date().getFullYear()
	        			,	firstJan
	        			,	firstSunday
	        			,	todaysDayElement;

	        			this.collection = new WorkoutCollection();

	        			populateYearPicker(thisYear);

	        			populateCalendar(thisYear);
	        		},
	        		events: {
	        			"change #year-picker": "selectYear",
	        			"click .weekly-table-day": "openDayOptions"
	        			
	        		},
	        		openDayOptions: function(e) {
	        			console.log("open day options");

	        			//append data-date to submit workout button so the event isn;t fired multiple times to other views hanging about in memory


	        			var date 			= new Date(Date.parse($(e.currentTarget).attr('data-date')))
	        			,	formattedDate 	= dateFormat(date, "dddd, mmmm dS, yyyy");

	        			$("#day-options-date").html(formattedDate);
	        			$('#day-options').attr("data-date", date);
	        			$('#day-options').fadeIn("fast");
	        			console.log("date passed to day options view", date);

	        			new DayOptionsView({  date: date, collection: this.collection });
	        		},
	        		selectYear: function(e) {
	        			console.log($(e.currentTarget).val());
	        			populateCalendar($(e.currentTarget).val());
	        		}	        		
	        	});

	        	var weeklyTableView = new WeeklyTableView();

	        	function populateYearPicker(thisYear){
	        		$("#year-picker").append("<option value='" + (thisYear - 1) + "'>" + (thisYear - 1) + "</option>");
        			$("#year-picker").append("<option selected='selected' value='" + thisYear + "'>" + thisYear + "</option>");
        			$("#year-picker").append("<option value='" + (thisYear + 1) + "'>" + (thisYear + 1) + "</option>");
	        	}

	        	function populateCalendar(thisYear){
	        		firstJan = new Date(thisYear,0,1);
	        			firstSunday = firstJan.getDay();

	        			$(".weekly-table-day").each(function(){
	        				var dataDayValue = $(this).attr('data-day');
	        				var daysToAdd = parseInt(dataDayValue) + (-1 * firstSunday - 1);
	        				var dateOfThisDay = firstJan.addDays(daysToAdd);
	        				$(this).attr('data-date', dateOfThisDay);
	        				$(this).children(".date").html(dateFormat(dateOfThisDay, "mmmm d"));
	        			});

	        		$(".weekly-table-day").removeClass("today");

	        		if (thisYear == new Date().getFullYear()){
	        			todaysDayElement = $(".weekly-table-day[data-date*='" + dateFormat(new Date(), "mmmm dd") +"']");
        				todaysDayElement.addClass("today");
        			}
	        	}
	        }
	    };

});