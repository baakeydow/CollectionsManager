const express           = require('express');
const path 				= require('path');
const DbUserController  = require('../Controllers/user.controller');

const router = express.Router();

router.post('/', (req, res, next) => {
    DbUserController.LoginRegister(req, res, next)
    .then((data) => {
      console.log('auth Success');
    }).catch((err) => {
      console.log('auth Error: \n\n', err);
    })
});
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../Public/index.html'));
});
router.get('/home', (req, res, next) => {
    DbUserController.FindUser(req, res, next)
    .then((data) => {
        if (data) {
            console.log('user registered');
            res.sendFile(path.join(__dirname, '../../Public/index.html'));
        }
    }).catch((err) => {
      console.log('auth Error: \n\n', err);
      return next(err);
    })
});
router.post('/finduser', (req, res, next) => {
    if (req.session.userId) {
        DbUserController.FindUser(req, res, next)
        .then((data) => {
            if (data) {
                res.json(data);
            }
        }).catch((err) => {
          console.log('auth Error: \n\n', err);
          res.json(err);
        })
    } else {
        res.json('user not logged In');
    }
});
router.post('/out', (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                console.log('session deleted !');
                return res.redirect('/');
            }
        });
    } else {
        console.log('did not log out');
        return res.redirect('/');
    }
});
router.get('/contact', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../Public/index.html'));
});
router.get('/articles', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../Public/index.html'));
});
router.get('/admin', (req, res, next) => {
  return next(new Error('Are you this much serious ? well try again you might find some'));
});
router.get('/user/*', (req, res, next) => {
  return next(new Error('ok try again...'));
});
router.get('/*', (req, res, next) => {
  var err = new Error("whats going on ?");
  err.status = err.status || 418;
  return next(err);
});
router.use((err, req, res, next) => {
    console.log('-1----1----1----1-------------11----------------1--------1-1--------------yooooooo I got you:', err);
  return next(err);
});

module.exports = router;
