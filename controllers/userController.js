var	passport          =   require('passport')
,  	LocalStrategy     =   require('passport-local').Strategy
,	User = require('../models/user').User
,	users = [ { id: 1, username: 'michael', password: 'password', email: 'michael@michaellam.co.uk' } ]
,	crypto = require('crypto');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

function findById(id, fn) {
	var idx = id - 1;
	if (users[idx]) {
		fn(null, users[idx]);
	} 
	else {
		fn(new Error('User ' + id + ' does not exist'));
	}
};

function initializePassport(){
	passport.use(new LocalStrategy(
	  function(username, password, done) {
	    process.nextTick(function () {
	      findByUsername(username, function(err, user) {
	        if (err) { return done(err); }
	        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
	        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
	        return done(null, user);
	      })
	    });
	  }
	));
}

function findByUsername(username, fn) {
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.username === username) {
		  return fn(null, user);
		}
	}
	return fn(null, null);
}

function createUser(req, res){
	console.log("creating user with " + req.body.email + " and " + req.body.password + "and name " + req.body.name);
	var hash = crypto.createHmac('sha1', 'somesalt').update(req.body.password).digest('hex');
	console.log("hash is " + hash);
	var user = new User({
		email: req.body.email,
		passwordHash: hash,
		name: req.body.name
	});
	user.save(function(err){
		if(err != null){
			console.log(err);
		}
		res.send(user);
	});
}

module.exports = {
	initialize: initializePassport,
	createUser: createUser
}