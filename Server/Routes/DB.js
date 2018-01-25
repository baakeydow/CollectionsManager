const express = require('express');
const DbLinkController = require('../Controllers/link.controller');

const router = express.Router();

// return a list of all Coll
router.route('/list').get((req, res, next) => {
    DbLinkController.ListAllColl(req, res, next)
    .then((data) => {
      console.log('success');
    }).catch((err) => {
      console.log('here is the Error: \n\n', err);
    })
});

// return a list of all items from all Coll
router.route('/listall').get((req, res, next) => {
    DbLinkController.ListAllItemsFromAllColl(req, res, next)
    .then((data) => {
      console.log('oO');
    }).catch((err) => {
      console.log('here is the Error: \n\n', err);
    })
});

// Get one Coll by name and list it
router.route('/getdbcoll').post((req, res, next) => {
    DbLinkController.GetOneDbColl(req, res, next)
    .then((data) => {
      console.log('success');
    }).catch((err) => {
      console.log('here is the Error: \n\n', err);
    })
});

// Add a new Coll and return a list of all Coll
router.route('/adddbcoll').post((req, res, next) => {
    DbLinkController.AddDbColl(req, res, next)
    .then((data) => {
      console.log('success');
    }).catch((err) => {
      console.log('here is the Error: \n\n', err);
    })
});

// Drop a Coll and return a list of all Coll
router.route('/dropdbcoll').post((req, res, next) => {
    DbLinkController.DropDbColl(req, res, next)
    .then((data) => {
      console.log('success');
    }).catch((err) => {
      console.log('here is the Error: \n\n', err);
    })
});

// Add item to Coll and list it
router.route('/additem').post((req, res, next) => {
    DbLinkController.AddItem(req, res, next)
    .then((data) => {
      console.log('success');
    }).catch((err) => {
      console.log('here is the Error: \n\n', err);
    })
});

// update
router.route('/updateitem').post((req, res, next) => {
    DbLinkController.UpdateItem(req, res, next)
    .then((data) => {
      console.log('success');
    }).catch((err) => {
      console.log('here is the Error: \n\n', err);
    })
});

// Delete item
router.route('/delitem').post((req, res, next) => {
    DbLinkController.DelOneItem(req, res, next)
    .then((data) => {
      console.log('success !');
    }).catch((err) => {
      console.log('here is the Error: \n\n', err);
    })
});

router.get('/', (req, res, next) => {
  var err = new Error("you've been locked up");
  err.status = 451;
  return next(err);
});

router.get('/*', (req, res, next) => {
  var err = new Error("Trying to mess with me ?");
  err.status = err.status || 418;
  return next(err);
});

module.exports = router;
