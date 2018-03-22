const express		= require('express');
const http			= require('http');
const fs			= require('fs');
const path 			= require('path');
const mongoose		= require('mongoose');

const connection = mongoose.connect('mongodb://localhost:27017/userLinks',{
	useMongoClient: true
});
const router = express.Router();

var DB = {};

mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
	DB = mongoose.connection.db;
});

var Schema = mongoose.Schema;
var postSchema = new Schema({
	article: {
		type: [],
		unique: true,
		required: true
	}
});

var protectRoute = (next) => {
	var err = new Error('403 you need to authenticate yourself');
	err.status = 403;
	return next(err);
}

var download = function(url, dest) {
	console.log(url);
	console.log(dest);
	return new Promise((resolve, reject) => {
		http.get(url, (res) => {
			if (res.statusCode !== 200) {
				var err = new Error('File couldn\'t be retrieved');
				err.status = res.statusCode;
				return reject(err);
			}
			var chunks = [];
			res.setEncoding('binary');
			res.on('data', (chunk) => {
				chunks += chunk;
			}).on('end', () => {
				var stream = fs.createWriteStream(dest);
				stream.write(chunks, 'binary');
				stream.on('finish', () => {
					resolve('File Saved !');
				});
				res.pipe(stream);
			})
		}).on('error', (e) => {
			console.log("Error: " + e);
			reject(e.message);
		});
	})
};

// Insert

router.route('/upload').post((req, res, next) => {
	console.log(req.file, 'uploaded !');
	res.json(req.file.originalname + ' uploaded');
});

router.route('/download').post((req, res, next) => {
	if (req.body.item && req.body.name) {
		var url = req.body.item.post.video ? req.body.item.post.video : req.body.item.post.image;
		var name = req.body.name + "." + url.split('.').pop();
		download(url.replace('https', 'http'), path.join(__dirname, '../../Public/folder/website/') + name).then((result) => {
			console.log(name + ' downloaded !');
			res.json(result)
		}).catch((err) => {
			console.log(err);
			next(err);
		})
	}
});


// Delete

router.route('/delfiles').post((req, res, next) => {
	return protectRoute(next);
});

// Find

function getPage(collection, start, nb, sortQuery) {
	return new Promise((resolve, reject) => {
		collection.find()
		.skip(parseInt(start))
		.limit(parseInt(nb))
		.sort(sortQuery)
		.toArray((err, doc) => {
			if (err) reject(err);
			resolve(doc);
		});
	});
}

router.get('/videos', (req, res, next) => {
	const folder_path = path.join(__dirname, './../../Public/videoPlaylist/');
	let availableVideos = [];
	let re = new RegExp('\.mp4$');
	fs.readdir(folder_path, (err, items) => {
		if (err) return next();
		for (var i=0; i<items.length; i++) {
			if (re.exec(items[i])) {
				availableVideos.push(items[i]);
			}
		}
		res.json(availableVideos[Math.floor(Math.random()*availableVideos.length)]);
	});
});

router.get('/play', (req, res, next) => {
	const video_path = path.join(__dirname, './../../Public/videoPlaylist/' + req.query.video);
	if (!fs.existsSync(video_path)) return next();
	const stat = fs.statSync(video_path);
	const fileSize = stat.size;
	const range = req.headers.range;
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-");
		const start = parseInt(parts[0], 10);
		const end = parts[1]
		? parseInt(parts[1], 10)
		: fileSize - 1;

		const chunksize = (end - start) + 1;
		const file = fs.createReadStream(video_path, {start, end});
		const head = {
			'Content-Range': `bytes ${start} - ${end} / ${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/mp4'
		};

		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			'Content-Length': fileSize,
			'Content-Type': 'video/mp4'
		};
		console.log('video played was asked directly from url source:', req.query.video);
		res.writeHead(200, head);
		fs.createReadStream(video_path).pipe(res);
	}
});


router.get('/*', (req, res, next) => {
    var err = new Error("Trying to mess with me ?");
    err.status = err.status || 418;
    return next(err);
});

module.exports = router;
