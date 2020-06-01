const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const { Review } = require('../database/models')

module.exports = {
    index: function(req, res) { // all users
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

    findUsers: function (req, res) {  // user search
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

    userDetailByUsername: function(req, res) { // user profile and reviews
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

    myProfile: function(req, res, results) { // own profile and reviews 
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
            .catch(function (error) {
                return res.send(error);
            })
    }
}