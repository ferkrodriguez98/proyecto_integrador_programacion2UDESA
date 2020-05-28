const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const { User } = require('../database/models');

module.exports = {
    index: function(req, res) {
        DB
            .Review
            .findAll(
            {
                include: [
                    { 
                        model: User,
                        as: 'user',
                        required: false,
                    }
                ]
            })
            .then(function (results) {
                return res.send(results);
            })
            .catch(function (error) {
                return res.send(error);
            })
    },

    newReview: function(req, res) {
        return res.render('reviews/new_review', {
            params : req.params,
            errors : false,
            email : false,
            series_review : false,
            rating : false,
        });
    },


    checkBeforeStoringReview: function(req, res) {
        console.log(req.body)
        DB
            .User
            .findOne(
                {
                    where : {
                        email: req.body.email,
                        password: req.body.password,
                    },
                    
                }
            )
            .then (function (results) {
                if (results[0] != '') {
                    return module.exports.saveReview(req, res, results)
                }
            })
            .catch (function (error) {
                console.log(error)
                return res.render('reviews/new/', { // aca falta pasar el id
                    id : req.params.id,
                    errors : "Incorrect username or password", 
                    email : req.body.email,
                });
            })
    },

    saveReview: function (req, res, results) {
        req.body.user_id = results.id; // negrada mal pero funciona
        console.log(req.body)
        DB
            .Review
            .create(req.body)
            .then(function (results) {
                return res.redirect('/series/detail/' + req.body.series_id)
            })
            .catch (error => {
                return res.send(error)
            })
    },

    editReview: function (req, res) {
		DB
			.Review
			.findByPk(req.params.id)
			.then(function (results) {
				return res.render('reviews/edit_review', {
                    id : results.id,
                    series_review : results.series_review,
                    rating : results.rating,
				})
			})
			.catch(function (error) { 
				return res.send(error); 
			})
    },
    
    updateReview: function(req, res) {
        DB
            .Review
            .update(req.body,
                {
                    where : {
                        id: req.params.id,
                    }
                }
            )
            .then(savedReview => {
                return res.redirect('/') // deberia mandar de vuelta a la serie
            })
            .catch (error => {
                return res.send(error)
            })
    },
    
    bestReviews: function(req, res) {
        DB
            .Review
            .findAll({
                order: [
                    [ 'rating', 'DESC' ]
                ],
                limit: 10,
            })
            .then(function (results) {
                res.send(results);
            })
            .catch(function (error) {
                return res.send(error)
            })
    },
    
    worstReviews: function(req, res) {
        DB
            .Review
            .findAll({
                order: [
                    [ 'rating', 'ASC' ]
                ],
                limit: 10,
            })
            .then(function (results) {
                res.send(results);
            })
            .catch(function (error) {
                return res.send(error)
            })
    },

    recentReviews: function(req, res) {
        DB
            .Review
            .findAll({
                order: [
                    [ 'updatedAt', 'DESC' ]
                ],
                limit: 5,
            })
            .then(function (results) {
                return res.render('reviews/recent', {
                    review: results,
                });
            })
            .catch(function (error) {
                return res.send(error)
            })
    },

    // userReviews: function(req, res) {
    //     console.log(req.params.username)
    //     console.log("HOLA")
    //     DB
    //         .Review
    //         .findAll(
    //         {
    //             where : {
    //                 username : req.params.username,
    //             }
    //         })
    //         .then(function (results) {
    //             return res.render('/users/profile', {
    //                 results : results,
    //             });
    //         })
    //         .catch(function (error) {
    //             return res.send(error)
    //         })
    // },

    seriesReviews: function(req, res) {
        DB
            .Review
            .findAll(
            {
                where : {
                    series_id : req.params.id,
                }
            })
            .then(function (results) {
                return res.send(results);
            })
            .catch(function (error) {
                return res.send(error)
            })
    },

    deleteReview: function(req, res) {
        console.log("hola")
        DB
            .Review
            .destroy({
                where: {
                    id : req.params.id
                }
            })
            .then(function (results) {
                return res.render('index'); // mandar al perfil de vuelta
            })
            .catch(function (error) {
                return res.send(error);
            })

    },

    ourFavouriteReviews: function(req, res) {
        DB
            .Review
            .findAll({
                where : {
                    user_id : 1,
                }
            })
            .then(function (results) {
                return res.render('reviews/ourfavourites', {
                    review : results,
                })
            })
            .catch(function (error) {
                return res.send(error);
            })
    }
}