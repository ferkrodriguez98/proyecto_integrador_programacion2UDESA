const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const usersController = require('../controllers/usersController')

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

module.exports = {
    index: function(req, res) { // renderiza la pagina del register sin datos
        return res.render('auth/register', {
            errors : {
                username_error : false, // no tienen nada en los campos porque es la primera vez que entra
                email_error : false,
            },
            username : false,
            email : false,
            favorite_genre : false,
            birthdate : false,
         });
    },

    checkIfExists: function(req, res) { // chequear antes de registrar
        DB
            .User
            .findOne(
                {
                    where: {
                        [Op.or]: [ // si encuentra una de las dos cosas es suficiente
                            {
                                username: { [Op.eq] : req.body.username } // tiene que ser exactamente igual
                            },
                            {
                                email: { [Op.eq] : req.body.email } // tiene que ser exactamente igual
                            }
                        ]
                    },
                }
            )
            .then (function (results) {
                if (!results) {
                    return module.exports.register(req, res); // lo mando a la funcion de este mismo archivo que lo registra
                }
                if (results.username == req.body.username && results.email == req.body.email) { // si las dos existen ya entra aca
                    return res.render('auth/register', { 
                        errors : { // le mando errores para que el usuario sepa que paso
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
                if (results.username == req.body.username) { // si solo el usuario existe entra aca
                    return res.render('auth/register', {  // renderizo de vuelta la pagina del register y le mando data
                        errors : {
                            username_error : "Username already in use", // le digo que el usuario ya existe
                            email_error : false, // el email esta bien 
                        },
                        username : req.body.username, // aca le mando lo que me mando en el form de vuelta para que no lo pierda
                        email : req.body.email,
                        favorite_genre : req.body.favorite_genre,
                        birthdate : req.body.birthdate,
                        results : results,
                    })
                }
                if (results.email == req.body.email) {
                    return res.render('auth/register', { // renderizo de vuelta la pagina del register y le mando data
                        errors : {
                            username_error: false, // el nombre de usuario esta bien
                            email_error : "E-mail already in use", // el mail ya esta en la base de datos
                        },
                        username : req.body.username, // le mando de vuelta lo que me mando en el form para que no lo pierda
                        email : req.body.email,
                        favorite_genre : req.body.favorite_genre,
                        birthdate : req.body.birthdate,
                        results: results,
                    })
                }
            })
            .catch (function (error) {
                console.log(error)
                return res.render('auth/register', { // renderizo de vuelta la pagina del register
                    errors : {
                        username_error: false,
                        email_error : "Unexpected error", // error inesperado
                    },
                    username : req.body.username, // le mando el mail y contraseña para que no lo pierda
                    email : req.body.email,
                });
            })
    },

    register: function(req, res) { // create in DB
        req.body.birthdate == '' ? req.body.birthdate = '2000-01-01' : req.body.birthdate = req.body.birthdate; // si no puso cumpleaños le pongo ese por default
        req.body.password = bcrypt.hashSync(req.body.password, 10) // le hasheo la password
        DB
            .User
            .create(req.body)
            .then (function (results) {
                return usersController.myProfile(req, res, results); // lo mando a esta funcion que renderiza el perfil
            })
            .catch (error => {
                return res.send(error)
            })
    },
}