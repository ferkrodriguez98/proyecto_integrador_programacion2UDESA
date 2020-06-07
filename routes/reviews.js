const express = require('express');
const router = express.Router();

const controller = require('../controllers/reviewsController');

router.get('/', controller.index);

router.post('/new', controller.newReview); // auth

router.post('/store', controller.checkBeforeStoringReview);

router.post('/edit', controller.editReview); // auth

router.post('/update', controller.checkBeforeUpdatingReview);

router.get('/best', controller.bestReviews);

router.get('/worst', controller.worstReviews);

router.get('/newest', controller.newestReviews);

router.get('/series/:id', controller.seriesReviews);

router.post('/delete/:id', controller.checkBeforeDeletingReview);

router.get('/our-favourites', controller.ourFavouriteReviews);

module.exports = router;
