define(['jquery', 'underscore', 'backbone', 'router'], 
	function($, _, Backbone, router) {
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