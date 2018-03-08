const express 			= require('express');
const path 				= require('path');
const url 				= require('url');
const http 				= require('http');
const auth 				= require('http-auth');
const bodyParser 		= require('body-parser');
const cookieParser		= require('cookie-parser');
const helmet 			= require('helmet')
const serveIndex		= require('serve-index');
const mds               = require('markdown-serve');
const mongoose			= require('mongoose');
const multer			= require('multer');
const DB				= require('./Routes/DB');
const USER				= require('./Routes/USER');
const FILES				= require('./Routes/FILES');
const NETVIBES			= require('./Routes/NETVIBES');

var fs = require('fs');
var util = require('util');
var wa = process.env.NODE_ENV === 'dev' ? 'w' : 'a';
var logFile = fs.createWriteStream(__dirname + "/logHistory.log", { flags: wa });
var logStdout = process.stdout;
console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;

const app				= express();

var session 			= require('express-session');
var MongoStore			= require('connect-mongo')(session);

var storage 			= multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../Public/up');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
})

var upload				= multer({ storage: storage, limits: { fileSize: '5MB' } });

var logIp				= function(req, message) {
	var location = url.parse(req.url).pathname;
	var xfwd = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').pop() : '';
	var ip = xfwd ||
		 req.connection.remoteAddress ||
		 req.socket.remoteAddress ||
		 req.connection.socket.remoteAddress;
    if (req.session.userId === 'yourUserId') {
        return;
    }
	console.log('X============IP==============X');
	if (message) {
		console.log(message);
	}
	console.log(req.headers);
	console.log('Doftom here is the ip for ' + location + ' |=> ', ip);
	console.log('X============IP==============X');
};

var allowXSS			= (req, res, next) => {
	if ('GET' == req.method) {
		var location = url.parse(req.url).pathname;
		var logIfFrom = ['/', '/home', '/articles', '/media', '/up', '/contact', '/4242', '/cheatsheet'];
		if (logIfFrom.includes(location)) {
			logIp(req);
		}
	}
	if (process.env.NODE_ENV === 'dev') {
		res.header('Access-Control-Allow-Origin', "*");
	}
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, application/json; charset=utf-8, Authorization, Content-Length, X-Requested-With, application/x-www-form-urlencoded, multipart/form-data');
	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
}

// username:user
// password:private

const basic				= auth.basic({
	realm: "Nope It's Private",
	file: __dirname + "/users.htpasswd"
});

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
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(allowXSS);
app.use(express.static(path.join(__dirname, '..', 'Public')));
app.set('views', path.join(__dirname, '..', 'Public', 'snippets'));
app.set('view engine', 'jade');
app.use('/cheatsheet', mds.middleware({
    rootDirectory: path.join(__dirname, '..', 'Public', 'snippets'),
    handler: (markdownFile, req, res, next) => {
        if (req.method !== 'GET') next();
        var title = markdownFile.meta && markdownFile.meta.title ? markdownFile.meta.title : "Welcome";
        res.render('markdown', { title: title, content: markdownFile.parseContent() });
    }
}));
app.use('/4242', auth.connect(basic), express.static(path.join(__dirname, '..', 'Public', 'folder')), serveIndex(path.join(__dirname, '..', 'Public', 'folder'), {'icons': true}))
app.use('/up/*', function (req, res, next) {
	if (!req.session.userId) {
		logIp(req, 'what are you looking for ?');
		var err = new Error('Nope your are absolutely not allowed to browse this folder gtfo m8');
		err.status = 401;
		return next(err);
	}
	next();
});
app.use('/up', express.static(path.join(__dirname, '..', 'Public', 'up')), serveIndex(path.join(__dirname, '..', 'Public', 'up'), {'icons': true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.disable('x-powered-by'); // handled by helmet ? hmmm... not quite the case actually

app.use('/files', upload.single('file'), FILES);

app.use('/netvibesdata', NETVIBES);

app.use('/db', DB);

app.use('/', USER);

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  err.status = err.status || 404;
  next(err);
});
app.get('/*', (req, res, next) => {
  var err = new Error('Here you get a nice url for yourelf... that\'s soooo random, would you like a cup of tea instead ?');
  err.status = 418;
  return next(err);
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
