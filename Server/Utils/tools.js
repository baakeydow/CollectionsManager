var fs   = require('fs');
var path = require('path');
var url  = require('url');
var util = require('util');
var auth = require('http-auth');
var multer = require('multer');
var mongoose = require('mongoose');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname + '/../../Public/up'));
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
})

var Tools = function() {
	var wa = process.env.NODE_ENV === 'dev' ? 'w' : 'a';
	var logFile = fs.createWriteStream(path.join(__dirname + "/../logHistory.log"), { flags: wa });
	var logStdout = process.stdout;
	console.log = function () {
	  logFile.write(util.format.apply(null, arguments) + '\n');
	  logStdout.write(util.format.apply(null, arguments) + '\n');
	}
	console.error = console.log;
};

var log = function(req, message) {
	var location = url.parse(req.url).pathname;
	var xfwd = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').pop() : '';
	var ip = xfwd ||
		 req.connection.remoteAddress ||
		 req.socket.remoteAddress ||
		 req.connection.socket.remoteAddress;
    if (req.session.userId === '59f4e39024d2c847b413d19b') {
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

Tools.prototype.logIp = log

Tools.prototype.connectBasic = function() {
	const basic = auth.basic({
		realm: "Nope It's Private",
		file: path.join(__dirname + "/../users.htpasswd")
	});
	return auth.connect(basic);
}

Tools.prototype.connection = function(db) {
	mongoose.Promise = global.Promise;
	// Connect
	mongoose.connect('mongodb://localhost:27017/' + db, {
		useMongoClient: true
	});
	mongoose.connection.once('open', () => {
	// Connected !
	});
	return mongoose.connection;
}

Tools.prototype.multerInstance = function(fileSize) {
	return multer({ storage: storage, limits: { fileSize: fileSize } });
}

Tools.prototype.allowXSS = function(req, res, next) {
	if ('GET' == req.method) {
		var location = url.parse(req.url).pathname;
		var logIfFrom = ['/', '/home', '/articles', '/media', '/up', '/contact', '/4242', '/cheatsheet'];
		if (logIfFrom.includes(location)) {
			log(req);
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
};

module.exports = Tools;
