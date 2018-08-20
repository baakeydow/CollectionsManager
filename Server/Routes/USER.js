const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const DbUserController = require('../Controllers/user.controller');

const router = express.Router();

router.post('/', (req, res, next) => {
  DbUserController.Login(req, res, next)
    .then((data) => {
      console.log('auth Success');
    }).catch((err) => {
      console.log('auth Error: \n\n', err);
    })
});
router.post('/newuser', (req, res, next) => {
  if (!req.session.userId) {
    DbUserController.Register(req, res, next)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      }).catch((err) => {
        console.log('Creation Error: \n\n', err);
        next(err);
      })
  } else {
    res.redirect('/');
  }
});
router.post('/finduser', (req, res, next) => {
  if (req.session.userId) {
    DbUserController.FindUser(req, res, next)
      .then((data) => {
        if (data) {
          data.password = null;
          data.passwordConf = null;
          res.json(data);
        }
      }).catch((err) => {
        console.log('auth Error: \n\n', err);
        res.json(err);
      })
  } else {
    res.json({
      _id: null,
      email: null,
      username: null,
      password: null,
      passwordConf: null,
      perm: null
    });
  }
});
router.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../Public/dist/index.html'));
});
router.get('/register', (req, res, next) => {
  // db.users.updateOne({email:'bndao'}, { $set: {"perm": 1 } })
  res.sendFile(path.join(__dirname, '../../Public/dist/index.html'));
});
router.get('/out', (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) return next(err);
      console.log('session deleted !');
      return res.redirect('/login');
    });
  } else {
    console.log('did not log out');
    return res.redirect('/');
  }
});
router.post('/contact', (req, res, next) => {
  res.json('allright');
});
router.get('/', (req, res, next) => {
  DbUserController.FindUser(req, res, next)
    .then((data) => {
      if (data) {
        console.log('------------------------------');
        console.log(data);
        console.log('------------------------------');
        console.log('user registered');
        res.sendFile(path.join(__dirname, '../../Public/dist/index.html'));
      }
    }).catch((err) => {
      console.log('auth Error: \n\n', err);
      return next(err);
    })
});
router.get('/contact*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../Public/dist/index.html'));
});
router.get('/articles', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../Public/dist/index.html'));
});
router.get('/media', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../Public/dist/index.html'));
});
router.get('/admin', (req, res, next) => {
  return next(new Error('Are you this much serious ? well try again you might find some'));
});
router.get('/user/*', (req, res, next) => {
  return next(new Error('ok try again...'));
});
router.use((err, req, res, next) => {
  console.log('\\o/ Waddup ?:', err);
  return next(err);
});

module.exports = router;
