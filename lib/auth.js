module.exports = {
	account: function(req, res){
	  res.render('account', { user: req.user });
	},

	login: function(req, res){
	  res.render('login', { user: req.user, message: req.flash('error') });
	}

};