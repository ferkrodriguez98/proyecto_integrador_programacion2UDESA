const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const { Review } = require('../database/models/review')

module.exports = {
    index: function(req, res) {
        // este debería ser el buscador de usuario por mail o por nombre de usuario
        // si no encuentra nada devuelve mensaje
        // el listado debe llevar a una pagina con el detalle del usuario
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

    // userDetailById: function(req, res) {
    //     DB
    //         .User
    //         .findByPk(req.params.id)
    //         .then(function (results) {
    //             return res.send(results);
    //         })
    //         .catch(function (error) {
    //             return res.send(error);
    //         })
    // },

    userDetailByUsername: function(req, res) {
        DB
            .User
            .findAll(
            {
                where: {
                    username: req.params.username,
                },
                // include: [
                //     { 
                //         association: Review,
                //         as: 'review'
                //     }
                // ]
            })
            // {
            //     where: [
            //         { username : req.params.username }
            //     ]
            // })
            .then(function (results) {
                return res.send(
                    'users/profile', 
                {
                    id : results.id,
                    username : results.username,
                    email: results.email,
                    birthdate: results.birthdate,
                    favorite_genre: results.favorite_genre
                }
                );
            })
            .catch(function (error) {
                return res.send(error)
            })
    }
}