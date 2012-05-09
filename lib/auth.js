module.exports = {
	account: function(req, res){
	  res.render('account', { user: req.user });
	},

	login: function(req, res){
	  res.render('index', { user: req.user, signUpValidationMessage: "",signInValidationMessage: "Incorrect credentials" });
	}

};