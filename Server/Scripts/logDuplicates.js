const mongoose		= require('mongoose');
const Promise		= require("bluebird");
const connection	= mongoose.connect('mongodb://localhost:27017/userLinks',{
	useMongoClient: true
});

var DB = {};

function logDuplicates(coll) {
	return new Promise((resolve) => {
		coll.aggregate(
			{"$group" : { "_id": "$post.image", "count": { "$sum": 1 } } },
			{"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } },
			{"$project": {"post.image" : "$_id", "_id" : 0} }
		).forEach((data) => {
			resolve(data);
		})
	});
}

// Connect
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
	console.log('Connected !\n');
	DB = mongoose.connection.db;
	var coll = DB.collection('InstagramPosts');
	logDuplicates(coll).then((data) => {
		console.log(data);
		process.exit();
	});
});
