var users = [
    { id: 1, username: 'michael', password: 'password', email: 'michael@michaellam.co.uk' }
];

module.exports = {
	findById: function findById(id, fn) {
				  var idx = id - 1;
				  if (users[idx]) {
				    fn(null, users[idx]);
				  } else {
				    fn(new Error('User ' + id + ' does not exist'));
				  }
				},
	findByUsername: function findByUsername(username, fn) {
					  for (var i = 0, len = users.length; i < len; i++) {
					    var user = users[i];
					    if (user.username === username) {
					      return fn(null, user);
					    }
					  }
					  return fn(null, null);
					}
}