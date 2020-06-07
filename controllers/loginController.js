const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const usersController = require('../controllers/usersController');
const bcrypt = require('bcryptjs');

module.exports = {
    index: function(req, res) { // renderizar la pagina del login sin datos
        return res.render('auth/login', { 
            errors: false,
            email: false,
         });
    },

    login: function(req, res) { // fijarse si existe el usuario
        DB
            .User
            .findOne(
                {
                    where : {
                        email: req.body.email, // chequear dato del form email contra la base de datos
                    }
                }
            )
            .then (function (results) {
                if (results != null) {
                    if (bcrypt.compareSync(req.body.password, results.password)) { // fijarse que las contraseñas coincidan
                        return usersController.myProfile(req, res, results) // lo mando a la funcion que renderiza el perfil
                    } else {
                        return res.render('auth/login', {
                            errors : "Incorrect password", // no eran iguales las contraseñas, pero el mail existe
                            email : req.body.email,
                        });
                    }
                } else {
                    next(); // se va al catch porque no encontró un mail
                }
            })
            .catch (function (error) {
                return res.render('auth/login', {
                    errors : "Unexistent user", // hubo un error o no se encontro el email en la base de datos
                    email : req.body.email,
                });
            })
    },

    userData: function(req, res) { // no lo usamos pero es el 4.3
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
                return res.send(results);
            })
            .catch(function (error) {
                return res.send(error);
            })
    }
}