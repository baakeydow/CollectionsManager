const mongoose			= require('mongoose');
const User          = require('./models/user');

// Create User
var LoginRegister = (req, res, next) => {
    return new Promise((resolve, reject) => {
        // confirm that user typed same password twice
        if (req.body.password !== req.body.passwordConf) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            return next(err);
        }
        if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

            var userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
            }

            User.create(userData, (error, user) => {
                if (error) {
                    return next(error);
                } else {
                    req.session.userId = user._id;
                    resolve(res.json(user));
                }
            });

        } else if (req.body.logemail && req.body.logpassword) {
        	var coll = mongoose.connection.db.collection('users');
            User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
                if (error || !user) {
                    var err = new Error('Wrong email or password.');
                    err.status = 401;
                    return next(err);
                } else {
                    req.session.userId = user._id;
                    resolve(res.json(req.session));
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
                console.log('userFetched: ', user);
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
    LoginRegister : LoginRegister,
    FindUser : FindUser
};
