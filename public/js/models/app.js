define(['jquery'], 
	function($) {
		return {
				getUser: function(callback){
						$.get('user/current', function(data){
						return callback(data);
					});
				}
		}
	}
);