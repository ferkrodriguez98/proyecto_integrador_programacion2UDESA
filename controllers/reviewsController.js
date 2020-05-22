const DB = require('../database/models');
const Op = DB.Sequelize.Op;

module.exports = {
    index: function(req, res) {
        DB
            .Review
            .findAll()
            .then(function (results) {
                return res.send(results);
            })
            .catch(function (error) {
                return res.send(error);
            })
    },

    newReview: function(req, res) {
        return res.render('series/new_review');
    },

    storeReview: function(req, res) {
        DB
            .Review
            .create(req.body)
            .then(savedReview => {
                return res.send(savedReview)
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
				return res.render('series/edit_review', {
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
                return res.send(savedReview)
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
                limit: 10,
            })
            .then(function (results) {
                return res.send(results);
            })
            .catch(function (error) {
                return res.send(error)
            })
    },

    userReviews: function(req, res) {
        DB
            .Review
            .findAll(
            {
                where : {
                    user_id : req.params.id,
                }
            })
            .then(function (results) {
                return res.send(results);
            })
            .catch(function (error) {
                return res.send(error)
            })
    },

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
}