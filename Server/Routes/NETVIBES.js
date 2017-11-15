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

router.route('/img').post((req, res, next) => {
    if (req.body[0] && req.body[0].value && req.body[0].value.enclosures) {
        var coll = DB.collection("netpost");
        coll.insert(req.body[0].value.enclosures, (err, doc) => {
            if (err) return next(err);
            console.log('=========> here is your doc: ', doc);
            res.json(doc);
        });
    }
});
router.route('/articles').post((req, res, next) => {
    if (req.body[0] && req.body[0].type === 'article') {
        var coll = DB.collection("netvibesArticles");
		console.log('here is my article:', req.body[0].value);
        coll.insert(req.body[0].value, (err, doc) => {
            if (err) return next(err);
            console.log('=========> here is your doc: ', doc);
            res.json(doc);
        });
    }
});

router.get('/img', (req, res, next) => {
    var coll = DB.collection("netpost");
    coll.find().toArray((err, doc) => {
        if (err) return next(err);
        console.log('youJustFoundThemAll: ', doc);
        res.json(doc);
    });
});

router.get('/articles', (req, res, next) => {
    var coll = DB.collection("netvibesArticles");
    coll.find().toArray((err, doc) => {
        if (err) return next(err);
        console.log('youJustFoundThemAll: ', doc);
        res.json(doc);
    });
});

router.get('/*', (req, res, next) => {
    var err = new Error("Trying to mess with me ?");
    err.status = err.status || 418;
    return next(err);
});

module.exports = router;



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
