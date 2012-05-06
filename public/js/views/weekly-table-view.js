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

	        			populateCalendarDates(thisYear);

	        			this.populateCalendarWorkouts();
	        		},
	        		events: {
	        			"change #year-picker": "selectYear",
	        			"click .weekly-table-day": "openDayOptions"	        			
	        		},
	        		openDayOptions: function(e) {
	        			var date 			= new Date(Date.parse($(e.currentTarget).attr('data-date')))
	        			,	formattedDate 	= dateFormat(date, "dddd, mmmm dS, yyyy");

	        			$("#day-options-date").html(formattedDate);
	        			$('#day-options').attr("data-date", date);
	        			$('#day-options').fadeIn("fast");

	        			new DayOptionsView({  date: date, collection: this.collection, parentView: this });
	        		},
	        		selectYear: function(e) {
	        			populateCalendarDates($(e.currentTarget).val());
	        			this.populateCalendarWorkouts();
	        		},
	        		populateCalendarWorkouts: function(){
    					$(".weekly-table-day").children(".workout-data").html("");

	        			_(this.collection.models).each(function(workout){
	        				var workoutDate = workout.get('date')
	        				,	workoutTableDayElement = $(".weekly-table-day[data-date='" + workoutDate + "']");
	        				if (workoutTableDayElement != null){
								workoutTableDayElement.children(".workout-data")
									.append("<span class='calendar-workout-item' data-workout-type='"
												+ workout.get('type') 
												+"' data-workout-duration='" 
												+ workout.get('duration') 
												+ "'>"
												+ workout.get('type') 
												+ ", " 
												+ workout.get('duration') 
												+ "hrs</span>");
	        				}
						}, this);
	        		}       		
	        	});

	        	var weeklyTableView = new WeeklyTableView();

	        	function populateYearPicker(thisYear){
	        		$("#year-picker").append("<option value='" + (thisYear - 1) + "'>" + (thisYear - 1) + "</option>");
        			$("#year-picker").append("<option selected='selected' value='" + thisYear + "'>" + thisYear + "</option>");
        			$("#year-picker").append("<option value='" + (thisYear + 1) + "'>" + (thisYear + 1) + "</option>");
	        	}

	        	function populateCalendarDates(thisYear){
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