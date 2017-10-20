const mongojs = require('mongojs');
const Fs 			= require('fs');
const DB = mongojs('linkslist', []);
const Coll = mongojs('linkslist', ['dbColl']);

var db = {};

var List = {}; // Collection's list

// init
var ListAllColl = function(req, res) {
	return new Promise((resolve, reject) => {
		DB.getCollectionNames((err, doc) => {
			if (err) reject(new Error(err));
			console.log('Here are the Collections: ', doc);
			resolve(res.json(doc));
		});
	});
}
// Add
var AddDbColl = function(req, res) {
	db = req.body.coll;
	return new Promise((resolve, reject) => {
		if (db) {
			List = mongojs('linkslist', [db]);
			List[db].insert(req.body, function(err, doc) {
				if (err) reject(new Error(err));
				console.log('NEW COLLECTION CREATED !!! => ', doc);
				List.getCollectionNames((err, doc) => {
					if (err) reject(new Error(err));
					resolve(res.json(doc));
				});
			});
		}
	});
}
// Dell
var DropDbColl = function(req, res) {
	db = req.body.name;
	return new Promise((resolve, reject) => {
		if (db) {
			List = mongojs('linkslist', [db]);
			List[db].drop()
			console.log(db, 'DROPED !!!!');
		}
		List.getCollectionNames((err, doc) => {
			if (err) reject(new Error(err));
			resolve(res.json(doc));
		});
	});
}
// Get one Coll
var GetOneDbColl = function (req, res) {
	db = req.body.name;
	return new Promise((resolve, reject) => {
		if (db) {
			List = mongojs('linkslist', [db]);
			List[db].find((err, doc) => {
				console.log('Collection retrieved !!! ====> ', db);
				console.log('here is the docs ==>', doc);
				if (err) reject(new Error(err));
				resolve(res.json(doc));
			});
		}
	});
}
// Add one item
var AddItem = function(req, res) {
	db = req.body.coll;
	var item = req.body.item;
	return new Promise((resolve, reject) => {
		if (db && item) {
			List = mongojs('linkslist', [db]);
			List[db].insert( { item: item }, function(err, doc) {
				if (err) reject(new Error(err));
				console.log('NEW ITEM ADDED !!! => ', doc);
				List[db].find((err, doc) => {
					if (err) reject(new Error(err));
					resolve(res.json(doc));
				});
			});
		}
	});
}

var DelOneItem = function(req, res) {
	db = req.body.coll;
	var id = req.body.id
	return new Promise((resolve, reject) => {
		if (db && id) {
			List = mongojs('linkslist', [db]);
		  	List[db].remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
				if (err) reject(new Error(err));
				console.log('NEW ITEM DELETED !!! => ', doc);
				List[db].find((err, doc) => {
					if (err) reject(new Error(err));
					resolve(res.json(doc));
				});
		    });
		}
	});
}

var UpdateItem = function(req, res) {
	db = req.body.coll;
	var id = req.body.id;
	console.log(req.body);
	return new Promise((resolve, reject) => {
		if (db && id) {
			List = mongojs('linkslist', [db]);
			List[db].findAndModify(
				{
					query: { _id: mongojs.ObjectId(id) },
					update: { $set: { item: req.body.item } },
					new: true
				}, function (err, doc) {
				if (err) reject(new Error(err));
				console.log('ITEM modified !!! => ', doc);
				List[db].find((err, doc) => {
					if (err) reject(new Error(err));
					resolve(res.json(doc));
				});
			});
		}
	});
}

module.exports = {
    AddItem : AddItem,
    ListAllColl : ListAllColl,
    GetOneDbColl : GetOneDbColl,
    AddDbColl : AddDbColl,
    DropDbColl : DropDbColl,
    DelOneItem : DelOneItem,
    UpdateItem : UpdateItem
};
