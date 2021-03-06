var	passport          =   require('passport')
,  	LocalStrategy     =   require('passport-local').Strategy
,	User = require('../models/user').User
,	crypto = require('crypto');


passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

function findById(id, fn) {
	User.findById(id, function (err, user){
  		if (user){
  			fn(null, user);
  		}
  		else {
  			fn(new Error('User ' + id + ' does not exist'));
  		}
	});
};

function initializePassport(){
	passport.use(new LocalStrategy(
	  function(email, password, done) {
	    process.nextTick(function () {
	      findByEmail(email, function(err, user) {
	        if (err) { return done(err); }
	        if (!user) { return done(null, false, { message: 'Unknown user ' + email }); }
	        if (user.passwordHash != getHash(password)) { return done(null, false, { message: 'Invalid password' }); }
	        return done(null, user);
	      })
	    });
	  }
	));
}

function findByEmail(email, fn) {
	User.findOne({ email: email}, function (err, user){
		if (user){
			console.log(user);
			return fn(null, user);
		} else {
			return fn(null, null);
		}
	});
}

function createUser(req, res, callback){
	var user = new User({
		email: req.body.email,
		passwordHash: getHash(req.body.password),
		friendlyName: req.body.friendlyName,
		createdAt: new Date()
	});

	User.findOne({ email: req.body.email}, function (err, user){
		if (user){
			res.render('index', { user: req.user, signUpValidationMessage: 'this email is already taken' });
		} else {
			user.save(function(err){
				if(err){
					console.log(err);
				}
				if(!callback) {
					res.send(user);
				} else {
					callback(user, req, res);
				}
			});
		}
	});
}

function getHash(valueToHash){
	return crypto.createHmac('sha1', 'somesalt').update(valueToHash).digest('hex');
}

module.exports = {
	initialize: initializePassport,
	createUser: createUser
}