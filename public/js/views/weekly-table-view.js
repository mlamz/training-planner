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

	        			this.render();

	        			this.populateCalendar(thisYear);	        			
	        		},
	        		render: function(){
	        			$(this.el).html($("#weekly-table-template").html());
	        		},
	        		events: {
	        			"change #year-picker": "selectYear",
	        			"click .weekly-table-day": "openDayOptions"	        			
	        		},
	        		openDayOptions: function(e) {
	        			var date 			= new Date(Date.parse($(e.currentTarget).attr('data-date')))
	        			,	formattedDate 	= dateFormat(date, "dddd, mmmm dS, yyyy");

	        			new DayOptionsView({  date: date, collection: this.collection, parentView: this });

	        			$("#day-options-date").html(formattedDate);
	        			$('#day-options').attr("data-date", date);
	        			$('#day-options').fadeIn("fast");
	        		},
	        		selectYear: function(e) {
	        			populateCalendarDates($(e.currentTarget).val());
	        			this.populateCalendarWorkouts();
	        		},
	        		populateCalendar: function(thisYear) {
	        			populateYearPicker(thisYear);

	        			populateCalendarDates(thisYear);

	        			this.populateCalendarWorkouts();
	        		},
	        		populateCalendarWorkouts: function(){

    					$(".weekly-table-day").children(".workout-data").html("");

	        			_(this.collection.models).each(function(workout){
	        				var workoutDate = workout.get('date')
	        				,	workoutTableDayElement = $(".weekly-table-day[data-date='" + workoutDate + "']")
	        				,	workoutDetails
                    		,   template;

                    		workoutDetails = { workout_type: workout.get('type'), workout_duration: workout.get('duration') };
                    		$("#calendar-workout-item-template").html(
                    			$("#calendar-workout-item-template").html().replace(new RegExp('&lt;', 'g'),'<').replace(new RegExp('&gt;', 'g'),'>')
                    		);

                    		template = _.template($("#calendar-workout-item-template").html(), workoutDetails );
	        				if (workoutTableDayElement != null){
								workoutTableDayElement.children(".workout-data")
									.append(template);
	        				}
						}, this);
						populateWeeklyTotals();
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

	        	function populateWeeklyTotals(){
	        		var weeklyDurations = [];

	        		$(".weekly-table-week").each(function(){
	        			var week = this;

	        			$(this).children().children().children(".calendar-workout-item").each(function(){
	        				weeklyDurations.push([$(week).attr("data-week-number"), $(this).attr("data-workout-duration")]);
	        			});
	        		});

	        		$(".weekly-table-week").each(function(){
	        			var week = this
	        			,	weeklyDurationTotal = 0;
		        		
		        		$(week).children().children(".duration-total").html("Duration total: 0 hrs");

		        		_(weeklyDurations).each(function(weeklyDurationItem){
		        			if(weeklyDurationItem[0] == $(week).attr("data-week-number")){
		        				weeklyDurationTotal += parseFloat(weeklyDurationItem[1]);
		        			}
		        			$(week).children().children(".duration-total").html("Duration total: " + weeklyDurationTotal + "hrs");
		        		});
	        		});
	        	}
	        }
	    };

});