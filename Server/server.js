const express 			= require('express');
const path 				= require('path');
const http 				= require('http');
const bodyParser 		= require('body-parser');
const cookieParser		= require('cookie-parser');
const helmet 			= require('helmet')
const serveIndex		= require('serve-index');
const mongoose			= require('mongoose');
const DB				= require('./Routes/DB');
const USER				= require('./Routes/USER');

const app				= express();

var session 			= require('express-session');
var MongoStore			= require('connect-mongo')(session);

var allowXSS			= (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, application/json; charset=utf-8 ,Authorization, Content-Length, X-Requested-With, application/x-www-form-urlencoded');
		if ('OPTIONS' == req.method) {
			res.sendStatus(200);
		} else {
			next();
		}
}
mongoose.Promise = global.Promise;
// Connect
mongoose.connect('mongodb://localhost:27017/userLinks',{
	useMongoClient: true
});
mongoose.connection.once('open', () => {
// Connected !
});
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(allowXSS);
app.use(express.static(path.join(__dirname, '..', 'Public')));
app.use('/4242', express.static(path.join(__dirname, '..', 'Public', 'folder')), serveIndex(path.join(__dirname, '..', 'Public', 'folder'), {'icons': true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
// app.disable('x-powered-by'); // handled by helmet


app.use('/db', DB);

app.use('/', USER);

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  err.status = err.status || 404;
  next(err);
});
app.get('/*', (req, res, next) => {
  return next(new Error('Here you get a nice url for yourelf... that\'s soooo random'));
});
// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  if (!err.status || err.status === 500) {
	  console.log('ALERT ALERT that\'s a 500 ==========================================');
      console.log(err);
	  console.log('====================================================================');
  }
  res.status(err.status || 500);
  res.send(err.message);
});


// Create an HTTP service.
http.createServer(app).listen(8000, () => {
	  console.log('Express app listening on port 8000\n\n\n\n');
});
