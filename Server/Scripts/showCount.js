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
	DB.collection('InstagramPosts').count().then((data) => {
		console.log('insta:', data);
	}).then(() => {
		DB.collection('netvibesArticles').count().then((data) => {
			console.log('articles:', data);
			process.exit();
		});
	})
});
