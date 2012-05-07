define([], 
	function() {

	    return {
	        initialize: function() {
	        	Date.prototype.getWeek = function() {
					var onejan = new Date(this.getFullYear(),0,1);
					return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
				};

				Date.prototype.addDays = function(days)
				{
				 	var date = new Date(this.valueOf());
				 	date.setDate(date.getDate() + days);
				 	return date;
				};
	        }
	    };

	}	
);