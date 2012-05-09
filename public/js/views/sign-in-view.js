define(['jquery', 'underscore', 'backbone'], 
	function($, _, Backbone) {
		return {
			initialize: function(){
				var SignInView = Backbone.View.extend({
					el: $("#sign-in"),
					initialize: function(){
						this.render();
					},
					render: function(){
						var template = _.template($("#sign-in-template").html());
						$("#sign-in-validation").html('');
						this.el.html(template);
					},
					events: {
						"click input[type=submit]" : "submitForm"
					},
					submitForm: function(e){
						var email = $("input#sign-in-email").val()
						,	passwordLength = $("input#sign-in-password").val().length
						,	emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
						,	isValid = true;

						if ($.trim(email) == ""){
							$("#sign-in-validation").html("Please enter your email");
							isValid = false;
						}	
						else if (passwordLength.length == 0){
							$("#sign-in-validation").html("Please enter your password");
							isValid = false;
						}
						else if (!emailRegex.test(email)){
							$("#sign-in-validation").html("Email regex");
							isValid = false;
						} 


						if (isValid) {
							$("#sign-in-form").submit();
						}
						else {
							e.preventDefault();
						}
					}
				});
				new SignInView();
			}
		}
	}
)