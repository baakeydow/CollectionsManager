const express 			= require('express');
const path 				= require('path');
const http 				= require('http');
const bodyParser 		= require('body-parser');
const cookieParser		= require('cookie-parser');
const helmet 			= require('helmet')
const auth 				= require('http-auth');
const DB				= require('./Routes/DB');
// const basic 			= auth.basic({
// 		realm: "Nope It's Private",
// 		file: __dirname + "/users.htpasswd"
// });

const app				= express();

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

app.use(allowXSS);
// app.use(auth.connect(basic));
app.use(express.static(path.join(__dirname, '..', 'Public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use('/db', DB);
// app.disable('x-powered-by'); // handled by helmet


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Public', 'index.html'));
});

// Create an HTTP service.
http.createServer(app).listen(8000);
