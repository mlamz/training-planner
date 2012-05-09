define(['jquery', 'underscore', 'backbone', 'encoder', 'date/custom-date-functions', 'date/date-format', 'collections/workout-collection', 'views/day-options-view'], 
	function($, _, Backbone, Encoder, customDateFunctions, dateFormatter, WorkoutCollection, DayOptionsView) {

	    return {
	        initialize: function() {
	        	var WeeklyTableView = Backbone.View.extend({
	        		el:$('#weekly-table'),
	        		initialize: function() {
	        			var	thisYear 	= new Date().getFullYear()
	        			,	self 		= this;

	        			this.collection = new WorkoutCollection();
	        			this.collection.fetch({
	        				success: function(){
    							self.render();
								self.populateCalendar(thisYear);
							}
						});
	        				        			
	        		},
	        		render: function(){
	        			$("#weekly-table-loading-message").hide();
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
	        			$('#day-options').show();
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
	        				,	workoutTableDayElement = $(".weekly-table-day[data-date='" + dateFormat(workoutDate, "mediumDate") + "']")
	        				,	workoutDetails
                    		,   template;

                    		workoutDetails = { workout_type: workout.get('type'), workout_duration: workout.get('duration') };

                    		template = _.template(Encoder.htmlDecode($("#calendar-workout-item-template").html()), workoutDetails );
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
	        		var firstJan = new Date(thisYear,0,1)
	        		,	firstJanDayNumber = firstJan.getDay();

	        			$(".weekly-table-day").each(function(){
	        				var dataDayValue = $(this).attr('data-day')
	        				,	daysToAdd = parseInt(dataDayValue) + (-1 * firstJanDayNumber - 1)
	        				,	dateOfThisDay = firstJan.addDays(daysToAdd);

	        				$(this).attr('data-date', dateFormat(dateOfThisDay, "mediumDate"));
	        				$(this).children(".date").html(dateFormat(dateOfThisDay, "mmmm d"));
	        			});

	        		$(".weekly-table-day").removeClass("today");

	        		if (thisYear == new Date().getFullYear()){
	        			todaysDayElement = $(".weekly-table-day[data-date*='" + dateFormat(new Date(), "mediumDate") +"']");
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

		        		var durationsForThisWeek = _.filter(weeklyDurations, function(weeklyDurationItem){
		        			return weeklyDurationItem[0] == $(this).attr("data-week-number");
		        		},this);

		        		_(durationsForThisWeek).each(function(weeklyDurationItem){
		        			weeklyDurationTotal += parseFloat(weeklyDurationItem[1]);
        				});
		        			
	        			$(week).children().children(".duration-total").html("Duration total: " + weeklyDurationTotal + "hrs");
		        		
	        		});
	        	}
	        }
	    };

});