const mongoose		= require('mongoose');
const Promise		= require("bluebird");
const connection	= mongoose.connect('mongodb://localhost:27017/userLinks',{
	useMongoClient: true
});

var DB = {};

// Connect
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
	console.log('Connected !\n');
	DB = mongoose.connection.db;
    var coll = DB.collection('InstagramPosts');
	coll.update({}, { $unset: { 'someField':1 } }, false, true)
	.then((result) => {
		console.log(result.result);
		process.exit();
	})
	.catch((err) => {
		console.log(err);
		process.exit();
	})
});
