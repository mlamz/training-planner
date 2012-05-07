var   express           =   require('express')
  ,   passport          =   require('passport')
  ,   util              =   require('util')
  ,   port              =   process.env.PORT || 3000
  ,   mongoose          =   require('mongoose')
  ,   LocalStrategy     =   require('passport-local').Strategy
  ,   workoutController =   require('./controllers/workoutController')
  ,   userController =   require('./controllers/userController');

userController.initialize();

mongoose.connect('mongodb://'+process.env.MONGOLABS_USER+':'+process.env.MONGOLABS_PASSWORD+'@ds033037.mongolab.com:33037/training-planner');

var app = express.createServer();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });
  
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.post('/workouts', function(req, res){
  workoutController.addWorkout(req, res);
});

app.get('/workouts', function(req, res){
  workoutController.findAll(function(workouts){
    res.send(workouts);
  });
});

app.delete('/workouts/:id', function(req, res){
  workoutController.deleteWorkout(req, res);
});

app.post('/users', function(req, res){
  console.log("posting user");
  userController.createUser(req, res);
});

app.listen(port);
console.log("server started");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
