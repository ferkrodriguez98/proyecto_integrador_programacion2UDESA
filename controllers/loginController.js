const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const usersController = require('../controllers/usersController');
// const bcrypt = require('bcryptjs');

// // Load hash from your password DB.
// bcrypt.compareSync("B4c0/\/", hash); // true
// bcrypt.compareSync("not_bacon", hash); // false

module.exports = {
    index: function(req, res) {
        return res.render('auth/login', { 
            errors: false,
            email: false,
         });
    },

    login: function(req, res) {
        console.log(req.body)
        DB
            .User
            .findOne(
                {
                    where : {
                        email: req.body.email,
                        password: req.body.password,
                    }
                }
            )
            .then (function (results) {
                if (results[0] != '') {
                    console.log(results.email)
                    return usersController.myProfile(req, res, results)
                }
            })
            .catch (function (error) {
                return res.render('auth/login', {
                    errors : "Incorrect username or password",
                    email : req.body.email,
                });
            })
    },

    // checkEmail: function(req, res) {

    // }

    // checkPassword: function(req, res) {
    //     console.log(req.body)
    //     DB
    //         .User
    //         .findOne(
    //             {
    //                 where : {
    //                     email : req.body.email,
    //                     password: req.body.password,
    //                 }
    //             }
    //         )
    //         .then (function (results) {
    //             return res.send(results[0]);
    //         })
    //         .catch (function (error) {
    //             return res.send(error);
    //         })
    // },

    /*
    findEmail: function(req, res) {
        .User
        buscar por PK si existe el email
    }
    */

    /* 
    buscar email y contraseña en la db
    */

    /*
    tomar email y devolver todos los datos del usuario
    */
}