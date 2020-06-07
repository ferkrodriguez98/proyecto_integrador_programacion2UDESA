const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const { Review } = require('../database/models')

module.exports = {
    index: function(req, res) { // no lo usamos
        DB
            .User
            .findAll()
            .then(function (results) {
                return res.send(results);
            })
            .catch(function (error) {
                return res.send(error);
            })
    },

    findUsers: function (req, res) {  // buscador de usuarios
        DB
            .User
            .findAll(
                {
                    where: {
                        [Op.or]: [ // si cumple una de estas dos cosas cool
                            {
                                username: { [Op.substring] : req.query.search } // que contenga el string que mandan
                            },
                            {
                                email: { [Op.substring] : req.query.search } // que contenga el string que mandan
                            }
                        ]
                    },
                }
            )
            .then(function(results) {
                return res.render('users/index', { // renderizo y mando todos los users que encontre
                    results : results, 
                    id : results.id,
                    username : results.username,
                    email: results.email,
                    birthdate: results.birthdate,
                    favorite_genre: results.favorite_genre,
                });
            })
            .catch(function(results) {
                return res.send(error);
            })
    },

    userDetailByUsername: function(req, res) { // perfil ajeno
        DB
            .User
            .findOne(
            {
                where: {
                    username: req.params.username,
                },
                raw: false,
                nest: true,
                include: [ // incluyo las reviews en la query para poder mostrarlas
                    { 
                        model: Review,
                        raw: true,
                        as: 'review',
                        required: false,
                    }
                ]
            })
            .then(function (results) {
                return res.render(
                    'users/profile', // renderizo y le mando toda la data
                {
                    id : results.id,
                    username : results.username,
                    email: results.email,
                    birthdate: results.birthdate,
                    favorite_genre: results.favorite_genre,
                    review: results.review,
                }
                );
            })
            .catch(function (error) {
                return res.send(error)
            })
    },

    myProfile: function(req, res, results) { // perfil propio, aca se entra solo despues de /login
        DB
            .User
            .findOne(
                {
                    where: {
                        email: results.email,
                    },
                    raw: false,
                    nest: true,
                    include: [ // incluyo las reviews para mandar toda la data
                    { 
                        model: Review,
                        raw: true,
                        as: 'review',
                        required: false,
                    }
                ]
                }
            )
            .then(function (results) {
                return res.render(
                    'users/myprofile', // renderizo y mando la data
                {
                    id : results.id,
                    username : results.username,
                    email: results.email,
                    birthdate: results.birthdate,
                    favorite_genre: results.favorite_genre,
                    review: results.review,
                    errors: false,
                }
                );
            })
            .catch(function (error) {
                return res.send(error);
            })
    }
}