define(['jquery', 'underscore', 'backbone', 'router'], 
	function($, _, Backbone, router) {
		return {
	        initialize: function() {
				window.App = {
					getUser: function(callback){
					$.get('user/current', function(data){
						return callback(data);
					});
				}
			}
		}
	}
});