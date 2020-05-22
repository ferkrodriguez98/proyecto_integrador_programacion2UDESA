const express = require('express');
const router = express.Router();

const controller = require('../controllers/reviewsController');

router.get('/', controller.index);

router.get('/new', controller.newReview);

router.post('/store', controller.storeReview);

router.get('/edit/:id', controller.editReview);

router.post('/update/:id', controller.updateReview);

router.get('/best', controller.bestReviews);

router.get('/worst', controller.worstReviews);

router.get('/recent', controller.recentReviews);

router.get('/user/:id', controller.userReviews);

router.get('/series/:id', controller.seriesReviews);

module.exports = router;
