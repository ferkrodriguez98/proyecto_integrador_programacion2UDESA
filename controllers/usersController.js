const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const { Review } = require('../database/models')

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

    findUsers: function (req, res) {
        console.log("hola")
        console.log(req.query.search)
        console.log("chau")
        DB
            .User
            .findAll(
                {
                    where: {
                        [Op.or]: [
                            {
                                username: { [Op.substring] : req.query.search }
                            },
                            {
                                email: { [Op.substring] : req.query.search }
                            }
                        ]
                    },
                }
            )
            .then(function(results) {
                console.log(results)
                return res.render('users/index', {
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

    // findUserReviews: function(req, res) {
    //     console.log("HOLA")
    //     DB
    //         .Review
    //         .findAll(
    //             {
    //                 where : {
    //                     username : req.params.username,
    //                 }
    //             })
    //             .then(function (results) {
    //                 return res.render('/users/profile', {
    //                     results : results,
    //                 });
    //             })
    //             .catch(function (error) {
    //                 return res.send(error)
    //             })
    // },

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
            .findOne(
            {
                where: {
                    username: req.params.username,
                },
                raw: false,
                nest: true,
                include: [
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
                    'users/profile', 
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
                console.log(error)
                return res.send(error)
            })
    },

    myProfile: function(req, res, results) {
        console.log("entre al controller de users papá")
        DB
            .User
            .findOne(
                {
                    where: {
                        email: results.email,
                    },
                    raw: false,
                    nest: true,
                    include: [
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
                console.log("USERSCONTROLLER")
                return res.render(
                    'users/myprofile', 
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
    }
}