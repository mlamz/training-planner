define(['jquery', 'underscore', 'backbone', 'router'], 
	function($, _, Backbone, router) {

	    return {
	        initialize: function() {
	        	var DayOptionsView = Backbone.View.extend({
	        		el:$('#day-options'),
	        		initialize: function() {
	        		},
	        		events: {
	        			"click .close-button": "close"
	        		},
	        		close: function() {
	        			$('#day-options').fadeOut("fast");
	        		}
	        	});

	        	var dayOptionsView = new DayOptionsView();
	        }
	    };

});