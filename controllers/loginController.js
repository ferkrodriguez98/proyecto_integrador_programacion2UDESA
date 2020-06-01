const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const usersController = require('../controllers/usersController');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

module.exports = {
    index: function(req, res) { // render auth/login -- guestMiddleware
        return res.render('auth/login', { 
            errors: false,
            email: false,
         });
    },

    login: function(req, res) { // check && login
        console.log(req.body)
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
                if (results[0] != '') {
                    console.log(results.email)
                    if (bcrypt.compareSync(req.body.password, results.password)) {
                        return usersController.myProfile(req, res, results)
                    } else { // hay forma de mandarlo al catch?
                        return res.render('auth/login', {
                            errors : "Incorrect username or password",
                            email : req.body.email,
                        });
                    }
                }
            })
            .catch (function (error) {
                return res.render('auth/login', {
                    errors : "Incorrect username or password",
                    email : req.body.email,
                });
            })
    },
}