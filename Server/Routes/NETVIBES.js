const express       = require('express');
const mongoose		= require('mongoose');
const connection	= mongoose.connect('mongodb://localhost:27017/userLinks',{
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

// Insert

router.route('/img').post((req, res, next) => {
    if (req.body[0] && req.body[0].value && req.body[0].value.enclosures) {
        var coll = DB.collection("netpost");
        coll.insert(req.body[0].value.enclosures, (err, doc) => {
            if (err) return next(err);
            res.json('thx');
        });
    }
});

router.route('/dropboximages').post((req, res, next) => {
    if (req.body[0] && req.body[0].value && req.body[0].value.share) {
        var coll = DB.collection("dropboxImages");
        coll.insert(req.body[0].value, (err, doc) => {
            if (err) return next(err);
            res.json('thx');
        });
    }
});

router.route('/articles').post((req, res, next) => {
    if (req.body[0] && req.body[0].type === 'article') {
        var coll = DB.collection("netvibesArticles");
		console.log('here is my article:', req.body[0].value);
        coll.insert(req.body[0].value, (err, doc) => {
            if (err) return next(err);
            res.json('thx');
        });
    }
});

router.route('/instagram').post((req, res, next) => {
	if (req.body[0] && req.body[0].type === 'instagram-like') {
        var coll = DB.collection("InstagramPosts");
		console.log('here is my instagram post:', req.body[0].value);
        coll.insert(req.body[0].value, (err, doc) => {
            if (err) return next(err);
            res.json('thx');
        });
    }
});

// Delete

router.route('/delimg').post((req, res, next) => {
	if (req.body && req.body.id && req.body.userId) {
		return new Promise((resolve, reject) => {
			var ModelItem = mongoose.model('netpost', postSchema.set('collection', 'netpost'));
			var coll = DB.collection('netpost');
			ModelItem.remove({ _id: req.body.id }, function (error) {
				if (error) return next(reject(error));
				coll.find().sort({ $natural: -1 }).sort({ $natural: -1 }).toArray((err, doc) => {
					if (err) return next(reject(err));
					console.log('Img deleted');
					resolve(res.json(doc));
				});
			});
		});
	}
	return protectRoute(next);
});

router.route('/deleteArticle').post((req, res, next) => {
    if (req.body && req.body.id && req.body.userId) {
		return new Promise((resolve, reject) => {
			var ModelItem = mongoose.model('netvibesArticles', postSchema.set('collection', 'netvibesArticles'));
			var coll = DB.collection('netvibesArticles');
			ModelItem.remove({ _id: req.body.id }, function (error) {
				if (error) return next(reject(error));
				coll.find().sort({ $natural: -1 }).toArray((err, doc) => {
					if (err) return next(reject(err));
					console.log('Item deleted');
					resolve(res.json(doc));
				});
			});
		});
    }
	return protectRoute(next);
});

router.route('/delinstagram').post((req, res, next) => {
	if (req.body && req.body.id && req.body.userId) {
		return new Promise((resolve, reject) => {
			var ModelItem = mongoose.model('InstagramPosts', postSchema.set('collection', 'InstagramPosts'));
			var coll = DB.collection('InstagramPosts');
			ModelItem.remove({ _id: req.body.id }, function (error) {
				if (error) return next(reject(error));
				coll.find().sort({ $natural: -1 }).toArray((err, doc) => {
					if (err) return next(reject(err));
					console.log('Item deleted');
					resolve(res.json(doc));
				});
			});
		});
	}
	return protectRoute(next);
});

router.route('/deldropboximage').post((req, res, next) => {
	if (req.body && req.body.id && req.body.userId) {
		return new Promise((resolve, reject) => {
			var ModelItem = mongoose.model('dropboxImages', postSchema.set('collection', 'dropboxImages'));
			var coll = DB.collection('dropboxImages');
			ModelItem.remove({ _id: req.body.id }, function (error) {
				if (error) return next(reject(error));
				coll.find().sort({ $natural: -1 }).toArray((err, doc) => {
					if (err) return next(reject(err));
					console.log('Item deleted');
					resolve(res.json(doc));
				});
			});
		});
	}
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

router.get('/img', (req, res, next) => {
    var coll = DB.collection("netpost");
	getPage(coll, req.query.start, req.query.limit, { $natural: -1 })
	.then((doc) => {
		res.json(doc);
	}).catch((err) => {
		return next(err);
	});
});

router.get('/articles', (req, res, next) => {
    var coll = DB.collection("netvibesArticles");
	getPage(coll, req.query.start, req.query.limit, { $natural: -1 })
	.then((doc) => {
		res.json(doc);
	}).catch((err) => {
		return next(err);
	});
});

router.get('/instagram', (req, res, next) => {
	if (!req.session.userId && !req.query.dev) return protectRoute(next);
	var coll = DB.collection("InstagramPosts");
	getPage(coll, req.query.start, req.query.limit, { _id: -1 })
	.then((doc) => {
		res.json(doc);
	}).catch((err) => {
		return next(err);
	});
});

router.get('/dropbox', (req, res, next) => {
	var coll = DB.collection("dropboxImages");
    coll.find().sort({ $natural: -1 }).toArray((err, doc) => {
        if (err) return next(err);
        res.json(doc);
    });
});

router.get('/*', (req, res, next) => {
    var err = new Error("Trying to mess with me ?");
    err.status = err.status || 418;
    return next(err);
});

module.exports = router;

// Dropbox

// { type: 'dropbox-file',
//   value:
//    { path: '/netvibesMedia/16nyc.jpg',
//      size: 256737,
//      date:
//       { moment: '2017-11-30T13:02:16.000Z',
//         offset: -60,
//         timestamp: 1512046936,
//         diffFromEpoch: false },
//      newfile: true,
//      type: 'application/binary; charset=utf-8',
//      share: 'https://www.dropbox.com/s/85aop5syfw3wfyx/16nyc.jpg?dl=0',
//      media: 'https://www.dropbox.com/s/85aop5syfw3wfyx/16nyc.jpg?dl=1' },
//   prefix: { name: 'dropboxfile', offset: 1 } }


// Instagram

// [ { type: 'instagram-like',
//     value: { post: [Object], liker: [Object] },
//     prefix: { name: 'instagramlike', offset: 1 } } ]

// Articles

// [
//     {
//         "_id":"5a01b1c3581bef7d5191565d",
//         "type":"article",
//         "value":
//         {
//             "id":"4c3291ee-c345-11e7-bd27-a0369fec92b4",
//             "publishedAt":{"moment":"2017-11-06T22:07:58.000Z",
//             "offset":-60,"timestamp":1510006078,
//             "diffFromEpoch":false},
//             "authors":[{"name":"Shep McAllister on Kinja Deals, shared by Shep McAllister to Lifehacker"}],
//             "title":"The 10 Best Deals of November 6, 2017","link":"https://deals.kinja.com/the-10-best-deals-of-november-6-2017-1820194859",
//             "content":"\n<img src=\"https://i.kinja-img.com/gawker-media/image/upload/s--3L6zuTiC--/c_fit,fl_progressive,q_80,w_636/raemd7lwfhrc4693fhng.jpg\"><p>We see a lot of deals around the web over on <a href=\"https://deals.kinja.com/#_ga=2.145597812.1768506348.1509369613-319711706.1471388436\" target=\"_blank\" rel=\"noopener\">Kinja Deals</a>, but these were our ten favorites today.<br></p>\n<p><a href=\"https://deals.kinja.com/the-10-best-deals-of-november-6-2017-1820194859\">Read more...</a></p>\n",
//             "enclosures":
//                 [
//                     {
//                         "link":"https://i.kinja-img.com/gawker-media/image/upload/s--3L6zuTiC--/c_fit,fl_progressive,q_80,w_636/raemd7lwfhrc4693fhng.jpg",
//                         "type":"image","source":"content","height":357,"width":636
//                     }
//                 ],
//                 "stream":
//                 {
//                     "id":"3a22707c-cc75-11e6-a043-842b2b6f7849",
//                     "title":"Lifehacker",
//                     "url":"http://lifehacker.com/"
//                 }
//         },
//         "prefix":{"name":"article","offset":1}
//     }
// ]
