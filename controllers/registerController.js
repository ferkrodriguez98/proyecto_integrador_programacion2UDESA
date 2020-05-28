const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const usersController = require('../controllers/usersController')

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

module.exports = {
    index: function(req, res) {
        return res.render('auth/register', {
            errors : {
                username_error : false,
                email_error : false,
            },
            username : false,
            email : false,
            favorite_genre : false,
            birthdate : false,
         });
    },

    checkIfExists: function(req, res) {
        DB
            .User
            .findOne(
                {
                    where: {
                        [Op.or]: [
                            {
                                username: { [Op.eq] : req.body.username }
                            },
                            {
                                email: { [Op.eq] : req.body.email }
                            }
                        ]
                    },
                }
            )
            .then (function (results) {
                if (!results) {
                    return module.exports.register(req, res);
                }
                if (results.username == req.body.username && results.email == req.body.email) {
                    return res.render('auth/register', { 
                        errors : {
                            username_error : "Username already in use",
                            email_error : "E-mail already in use",
                        },
                        username : req.body.username,
                        email : req.body.email,
                        favorite_genre : req.body.favorite_genre,
                        birthdate : req.body.birthdate,
                        results : results,
                    })
                }
                if (results.username == req.body.username) {
                    return res.render('auth/register', { 
                        errors : {
                            username_error : "Username already in use",
                            email_error : false,
                        },
                        username : req.body.username,
                        email : req.body.email,
                        favorite_genre : req.body.favorite_genre,
                        birthdate : req.body.birthdate,
                        results : results,
                    })
                }
                if (results.email == req.body.email) {
                    return res.render('auth/register', {
                        errors : {
                            username_error: false,
                            email_error : "E-mail already in use",
                        },
                        username : req.body.username,
                        email : req.body.email,
                        favorite_genre : req.body.favorite_genre,
                        birthdate : req.body.birthdate,
                        results: results,
                    })
                }
            })
            .catch (function (error) {
                console.log(error)
                return res.render('auth/register', {
                    errors : {
                        username_error: false,
                        email_error : false,
                    },
                    username : req.body.username,
                    email : req.body.email,
                });
            })
    },

    register: function(req, res) {
        DB
            .User
            .create(req.body)
            .then (function (results) {
                return usersController.myProfile(req, res, results);
            })
            .catch (error => {
                return res.send(error)
            })
    },
}