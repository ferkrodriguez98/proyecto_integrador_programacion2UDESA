const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const { User } = require('../database/models');
const { Review } = require('../database/models')
const bcrypt = require('bcryptjs');

module.exports = {
    index: function(req, res) { // busca todas las reviews (no la estamos usando)
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

    newReview: function(req, res) { // renderiza la pagina de nueva review
        return res.render('reviews/new_review', {
            series_id : req.body.series_id,
            errors : false,
            email : false,
            series_review : false,
            rating : false,
        });
    },

    checkBeforeStoringReview: function(req, res) { // chequeo antes de crearla que todo este bien
        DB
            .User
            .findOne(
                {
                    where : {
                        email: req.body.email, // me fijo que el email que puso exista
                    },
                    
                }
            )
            .then (function (results) {
                if (results != null) {
                    if (bcrypt.compareSync(req.body.password, results.password)) { // me fijo que la contraseña sea correcta
                        return module.exports.saveReview(req, res, results) // si es correcta la mando a guardar
                    } else {
                        return res.render('reviews/new_review', { // si la contraseña esta mal lo mando de vuelta a que la ponga y le dejo los campos llenos
                            series_id : req.body.series_id,
                            errors : "Incorrect password", 
                            email : req.body.email,
                            series_review : req.body.series_review,
                            rating : req.body.rating,
                        });
                    }
                } else {
                    return res.render('reviews/new_review', { // si el mail no exista lo mismo que arriba
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
                return res.render('reviews/new_review', { // error inesperado y le mando todo igual
                    series_id : req.body.series_id,
                    errors : "An unexpected error happened, please try again", 
                    email : req.body.email,
                    series_review : req.body.series_review,
                    rating : req.body.rating,
                });
            })
    },

    saveReview: function (req, res, results) { // guardar en la db la review
        req.body.user_id = results.id; // cheat para no perderlo
        console.log(req.body)
        DB
            .Review
            .create(req.body)
            .then(function (results) {
                return res.redirect('/series/detail/' + req.body.series_id) // lo redirijo a la serie
            })
            .catch (error => {
                return res.send(error)
            })
    },

    editReview: function (req, res) { // renderiza la pagina de edtit del review
		DB
			.Review
			.findByPk(req.body.review_id)
			.then(function (results) {
				return res.render('reviews/edit_review', {
                    params : req.params,
                    errors : false,
                    email : false,
                    review_id : results.id, // le mando los datos para mostrar la serie que es
                    series_id : results.series_id,
                    series_review : results.series_review,
                    rating : results.rating,
				})
			})
			.catch(function (error) { 
				return res.send(error); 
			})
    },

    checkBeforeUpdatingReview: function(req, res) { // me fijo bien el user antes de updatear la review
        console.log(req.body)
        DB
            .User
            .findOne(
                {
                    where : {
                        email: req.body.email, // me fijo que el mail exista
                    },
                    
                }
            )
            .then (function (results) {
                if (results != null) {
                    if (bcrypt.compareSync(req.body.password, results.password)) { // me fijo si la password es correcta
                        return module.exports.updateReview(req, res, results) // procedo a updatear
                    } else {
                        return res.render('reviews/edit_review', { // si no es correcta la password mismo que siempre lo mando de vuelta para atras con la data
                            review_id : req.body.review_id,
                            series_id : req.body.series_id,
                            errors : "Incorrect password", 
                            email : req.body.email,
                            series_review : req.body.series_review,
                            rating : req.body.rating,
                        });
                    }
                } else {
                    return res.render('reviews/edit_review', { // mismo que arriba pero con el mail que no existe
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
                return res.render('reviews/edit_review', { // error inesperado y le mando la data
                    review_id : req.body.review_id,
                    series_id : req.body.series_id,
                    errors : "Sorry, an error ocurred, please try again", 
                    email : req.body.email,
                    series_review : req.body.series_review,
                    rating : req.body.rating,
                });
            })
    },
    
    updateReview: function(req, res, results) { // efectivamente actualizo la review con la data nueva
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

    newestReviews: function(req, res) { // recent reviews
        DB
            .Review
            .findAll({
                order: [
                    [ 'updatedAt', 'DESC' ]
                ],
                include: [
                    { 
                        model: User,
                        as: 'user',
                        required: false,
                    }
                ],
                limit: 10,
            })
            .then(function (results) {
                return res.render('reviews/newest', {
                    review: results,
                });
            })
            .catch(function (error) {
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
                include: [
                    { 
                        model: User,
                        as: 'user',
                        required: false,
                    }
                ],
                limit: 10,
            })
            .then(function (results) {
                res.render('reviews/best', {
                    review: results,
                });
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
                include: [
                    { 
                        model: User,
                        as: 'user',
                        required: false,
                    }
                ],
                limit: 10,
            })
            .then(function (results) {
                res.render('reviews/worst', {
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

    checkBeforeDeletingReview: function(req, res) { // me fijo bien el user antes de deletear la review
        console.log(req.body)
        DB
            .User
            .findOne(
                {
                    where : {
                        username: req.body.username, // busco el usuario
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
                    ],
                }
            )
            .then (function (results) {
                if (results != null) {
                    if (bcrypt.compareSync(req.body.password, results.password)) { // me fijo si la password es correcta
                        return module.exports.deleteReview(req, res, results) // procedo a deletear
                    } else {
                        return res.render('users/myprofile', { // si no es correcta la password mismo que siempre lo mando de vuelta para atras con la data
                            id : results.id,
                            username : results.username,
                            email: results.email,
                            birthdate: results.birthdate,
                            favorite_genre: results.favorite_genre,
                            review: results.review,
                            errors: "Incorrect password",
                        });
                    }
                }
            })
            .catch (function (error) {
                console.log(error)
                return res.render('users/myprofile', { // error inesperado y le mando la data
                    id : results.id,
                    username : results.username,
                    email: results.email,
                    birthdate: results.birthdate,
                    favorite_genre: results.favorite_genre,
                    review: results.review,
                    errors : "Sorry, an error ocurred, please try again", 
                });
            })
    },

    deleteReview: function(req, res) { // destruyo la review de la base de datos
        console.log(req.body)
        DB
            .Review
            .destroy({
                where: {
                    id : req.params.id
                }
            })
            .then(function (results) {
                return res.render('index'); // mando al home, podriamos mandar al perfil de vuelta o al detalle de esa serie
            })
            .catch(function (error) {
                return res.send(error);
            })

    },

    ourFavouriteReviews: function(req, res) { // reviews de carlitostebes
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