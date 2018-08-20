const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const serveIndex = require('serve-index');
const mds = require('markdown-serve');
const DB = require('./Routes/DB');
const USER = require('./Routes/USER');
const FILES = require('./Routes/FILES');
const NETVIBES = require('./Routes/NETVIBES');
const Tools = require('./Utils/tools');

var env = new Tools();
var upload = env.multerInstance('10MB');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

const client = process.env.NODE_ENV === 'dev' ?
  express.static(path.join(__dirname, '..', 'Public'))
  :
  express.static(path.join(__dirname, '..', 'Public/dist'))

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  store: new MongoStore({
    mongooseConnection: env.connection('userLinks')
  })
}));
app.use(env.allowXSS);
app.use(client);
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
app.use('/4242', env.connectBasic(), express.static(path.join(__dirname, '..', 'Public', 'folder')), serveIndex(path.join(__dirname, '..', 'Public', 'folder'), { 'icons': true }))
app.use('/up/*', function (req, res, next) {
  if (!req.session.access) {
    env.logIp(req, 'what are you looking for ?');
    var err = new Error('Nope your are absolutely not allowed to browse this folder gtfo m8');
    err.status = 401;
    return next(err);
  }
  next();
});
app.use('/up', express.static(path.join(__dirname, '..', 'Public', 'up')), serveIndex(path.join(__dirname, '..', 'Public', 'up'), { 'icons': true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.disable('x-powered-by'); // handled by helmet ?

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
