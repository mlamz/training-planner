define(['jquery', 'underscore', 'backbone'], 
	function($, _, Backbone) {
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
					},
					events: {
						"click #sign-up-submit": "signUpSubmit"
					},
					signUpSubmit: function(e){
						var email = $("input#username").val()
						,	friendlyName = $("input#friendlyName").val()
						,	password = $("input#password").val()
						,	emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
						,	isValid = true;

						if ($.trim(friendlyName) == ""){
							$("#sign-up-validation").html("Please enter your name");
							isValid = false;
						}
						else if ($.trim(email) == ""){
							$("#sign-up-validation").html("Please enter your email");
							isValid = false;
						}
						else if (!emailRegex.test(email)){
							$("#sign-up-validation").html("Please enter a valid email");
							isValid = false;
						}
						else if (password.length == 0){
							$("#sign-up-validation").html("Please enter your password");
							isValid = false;
						}

						if (isValid) {
							$("#sign-up-form").submit();
						}
						else {
							$("#sign-up-validation").show();
							e.preventDefault();
						}
					}
				});
				new SignUpView();
			}
		}
	}
)