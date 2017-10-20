const express = require('express');
const DbController = require('../Controllers/db.controller');

const router = express.Router();

// return a list of all Coll
router.route('/list').get(DbController.ListAllColl);

// Get one Coll by name and list it
router.route('/getdbcoll').post(DbController.GetOneDbColl);

// Add a new Coll and return a list of all Coll
router.route('/adddbcoll').post(DbController.AddDbColl);

// Drop a Coll and return a list of all Coll
router.route('/dropdbcoll').post(DbController.DropDbColl);

// Add item to Coll and list it
router.route('/additem').post(DbController.AddItem);

// update
router.route('/updateitem').post(DbController.UpdateItem);

// Delet item
router.route('/delitem').post(DbController.DelOneItem);


router.get('/*', function(req, res, next) {
  res.redirect(301, '/');
});

module.exports = router;
