const express = require('express');
const router = express.Router();

const controller = require('../controllers/reviewsController');

router.get('/', controller.index);

router.get('/new', controller.newReview);

router.get('/new/:id', controller.newReview);

router.post('/store', controller.checkBeforeStoringReview);

router.get('/edit/:id', controller.editReview);

router.post('/update/:id', controller.updateReview);

router.get('/best', controller.bestReviews);

router.get('/worst', controller.worstReviews);

router.get('/recent', controller.recentReviews);

router.get('/series/:id', controller.seriesReviews);

router.post('/delete/:id', controller.deleteReview);

router.get('/our-favourites', controller.ourFavouriteReviews);

module.exports = router;
