const DB = require('../database/models');
const Op = DB.Sequelize.Op;
// const bcrypt = require('bcryptjs');

// // Load hash from your password DB.
// bcrypt.compareSync("B4c0/\/", hash); // true
// bcrypt.compareSync("not_bacon", hash); // false

module.exports = {
    index: function(req, res) {
        return res.render('auth/login');
    },

    checkUser: function(req, res) {
        console.log(req.body.email)
        console.log(req.body.password)
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
                return res.send("Lo encontré"); // esta entrando aca siempre
            })
            .catch (function (error) {
                return res.send("No lo encontré");
            })
    },

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