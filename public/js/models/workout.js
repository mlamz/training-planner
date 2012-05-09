define(['backbone'], 
	function(Backbone) {
    	var Workout = Backbone.Model.extend({
    		urlRoot: '/workout',
    		initialize: function(attributes){
    			this.id = attributes['_id'];
    		},
    		url: function(){
    			if (this.isNew()){
    				return this.urlRoot;
    			}
    			return '/workout/' + this.id;
    		}
    	});

    	return Workout;
	}
);