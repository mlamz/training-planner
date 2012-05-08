define(['jquery', 'underscore', 'backbone', 'router'], 
	function($, _, Backbone, router) {
		return {
			initialize: function(){
				var SignUpView = Backbone.View.extend({
					el: $("#sign-up"),
					initialize: function(){
						this.render();
					},
					render: function(){
						var template = _.template($("#sign-up-template").html());
						this.el.html(template);
					}
				});
				new SignUpView();
			}
		}
	}
)