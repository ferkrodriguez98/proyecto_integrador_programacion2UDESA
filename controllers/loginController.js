const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const usersController = require('../controllers/usersController');
const bcrypt = require('bcryptjs');

module.exports = {
    index: function(req, res) { // render auth/login -- guestMiddleware
        return res.render('auth/login', { 
            errors: false,
            email: false,
         });
    },

    login: function(req, res) { // check && login
        DB
            .User
            .findOne(
                {
                    where : {
                        email: req.body.email,
                    }
                }
            )
            .then (function (results) {
                if (results != null) {
                    if (bcrypt.compareSync(req.body.password, results.password)) {
                        return usersController.myProfile(req, res, results)
                    } else {
                        return res.render('auth/login', {
                            errors : "Incorrect password",
                            email : req.body.email,
                        });
                    }
                } else {
                    next(); // se va al catch
                }
            })
            .catch (function (error) {
                return res.render('auth/login', {
                    errors : "Unexistent user",
                    email : req.body.email,
                });
            })
    },
}