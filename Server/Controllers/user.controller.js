const User = require('./models/user');

var userExist = (keyValue) => {
  return new Promise((resolve, reject) => {
    User.findOne(keyValue)
      .exec(function (err, user) {
        if (!err && user) {
          resolve();
        } else {
          reject();
        }
      });
  });
}

// Create User

var Register = (req, res, next) => {
  return new Promise((resolve, reject) => {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      reject(err);
    } else if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf) {

      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
        perm: 0
      }

      userExist({ email: userData.email }).then((ok) => {
        var err = new Error('email already taken');
        err.status = 400;
        reject(err);
      }).catch((ko) => {
        userExist({ username: userData.username }).then((ok) => {
          var err = new Error('username already taken');
          err.status = 400;
          reject(err);
        }).catch((ko) => {
          User.create(userData, (error, user) => {
            if (error) {
              return next(error);
            } else {
              req.session.userId = user._id;
              req.session.access = user.perm;
              resolve(user);
            }
          });
        });
      });
    }
  });
}

var Login = (req, res, next) => {
  return new Promise((resolve, reject) => {
    if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          req.session.access = user.perm;
          resolve(res.json(user));
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  });
}

// Find User

var FindUser = (req, res, next) => {
  return User.findById(req.session.userId)
    .then((user) => {
      if (!user) {
        var err = new Error('Not authorized! Go back!');
        err.status = 400;
        return next(err);
      } else {
        return user;
      }
    }).catch((error) => {
      conosle.log(error);
      var err = new Error('you need to log in now');
      err.status = 400;
      return next(err);
    })

}

// Log out

var UserLogout = (req, res, next) => {

}

module.exports = {
  Login,
  Register,
  FindUser
};


// User.find()
// .exec(function (err, user) {
//   if (err) {
//     console.log(err);
//   } else if (!user) {
//     var err = new Error('User not found.');
//     err.status = 401;
//     console.log(err);
//   }
//   console.log(user);
// });