const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const { User } = require('../database/models');
const bcrypt = require('bcryptjs');

module.exports = {
    index: function(req, res) { // search all reviews
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

    newReview: function(req, res) { // render reviews/new_review -- authMiddleware
        return res.render('reviews/new_review', {
            series_id : req.body.series_id,
            errors : false,
            email : false,
            series_review : false,
            rating : false,
        });
    },

    checkBeforeStoringReview: function(req, res) { // auth before storing review
        DB
            .User
            .findOne(
                {
                    where : {
                        email: req.body.email,
                    },
                    
                }
            )
            .then (function (results) {
                if (results != null) {
                    if (bcrypt.compareSync(req.body.password, results.password)) {
                        return module.exports.saveReview(req, res, results)
                    } else {
                        return res.render('reviews/new_review', {
                            series_id : req.body.series_id,
                            errors : "Incorrect password", 
                            email : req.body.email,
                            series_review : req.body.series_review,
                            rating : req.body.rating,
                        });
                    }
                } else {
                    return res.render('reviews/new_review', {
                        series_id : req.body.series_id,
                        errors : "Unexistent user", 
                        email : req.body.email,
                        series_review : req.body.series_review,
                        rating : req.body.rating,
                    });
                }
            })
            .catch (function (error) {
                console.log(error)
                return res.render('reviews/new_review', {
                    series_id : req.body.series_id,
                    errors : "An unexpected error happened, please try again", 
                    email : req.body.email,
                    series_review : req.body.series_review,
                    rating : req.body.rating,
                });
            })
    },

    saveReview: function (req, res, results) { // store review
        req.body.user_id = results.id; // forrada mal? funciona 
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

    editReview: function (req, res) { // render reviews/edit_review -- authMiddleware
		DB
			.Review
			.findByPk(req.body.review_id)
			.then(function (results) {
				return res.render('reviews/edit_review', {
                    params : req.params,
                    errors : false,
                    email : false,
                    review_id : results.id,
                    series_id : results.series_id,
                    series_review : results.series_review,
                    rating : results.rating,
				})
			})
			.catch(function (error) { 
				return res.send(error); 
			})
    },

    checkBeforeUpdatingReview: function(req, res) { // auth before updating review
        console.log(req.body)
        DB
            .User
            .findOne(
                {
                    where : {
                        email: req.body.email,
                    },
                    
                }
            )
            .then (function (results) {
                if (results != null) {
                    if (bcrypt.compareSync(req.body.password, results.password)) {
                        return module.exports.updateReview(req, res, results)
                    } else {
                        return res.render('reviews/edit_review', { 
                            review_id : req.body.review_id,
                            series_id : req.body.series_id,
                            errors : "Incorrect password", 
                            email : req.body.email,
                            series_review : req.body.series_review,
                            rating : req.body.rating,
                        });
                    }
                } else {
                    return res.render('reviews/edit_review', {
                        review_id : req.body.review_id,
                        series_id : req.body.series_id,
                        errors : "Unexistent user", 
                        email : req.body.email,
                        series_review : req.body.series_review,
                        rating : req.body.rating,
                    });
                }
            })
            .catch (function (error) {
                console.log(error)
                return res.render('reviews/edit_review', { 
                    review_id : req.body.review_id,
                    series_id : req.body.series_id,
                    errors : "Sorry, an error ocurred, please try again", 
                    email : req.body.email,
                    series_review : req.body.series_review,
                    rating : req.body.rating,
                });
            })
    },
    
    updateReview: function(req, res, results) { // update review
        console.log(req.body)
        DB
            .Review
            .update(req.body,
                {
                    where : {
                        id: req.body.review_id,
                    }
                }
            )
            .then(function (results) {
                return res.redirect('/series/detail/' + req.body.series_id)
            })
            .catch (error => {
                return res.send(error)
            })
    },
    
    bestReviews: function(req, res) { // best reviews
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
    
    worstReviews: function(req, res) { // worst reviews
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

    recentReviews: function(req, res) { // recent reviews
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

    seriesReviews: function(req, res) { // reviews from a series
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

    deleteReview: function(req, res) { // destroy review
        console.log(req.body)
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

    ourFavouriteReviews: function(req, res) { // reviews from user with id 1
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