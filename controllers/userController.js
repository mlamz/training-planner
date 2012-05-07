var	passport          =   require('passport')
,  	LocalStrategy     =   require('passport-local').Strategy
,	User = require('../models/user').User
,	users = [ { _id: 1, name: 'michael', passwordHash: '993c16c5adda9cbb9fb78de3a067c00fa287094b', email: 'michael@michaellam.co.uk' } ]
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
  		if (user != null){
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
		if (user != null){
			console.log(user);
			return fn(null, user);
		} else {
			return fn(null, null);
		}
	});
}

function createUser(req, res){
	var user = new User({
		email: req.body.email,
		passwordHash: getHash(hash),
		name: req.body.name
	});
	user.save(function(err){
		if(err != null){
			console.log(err);
		}
		res.send(user);
	});
}

function getHash(valueToHash){
	return crypto.createHmac('sha1', 'somesalt').update(valueToHash).digest('hex');
}

module.exports = {
	initialize: initializePassport,
	createUser: createUser
}