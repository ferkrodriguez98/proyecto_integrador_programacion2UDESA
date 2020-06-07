const express = require('express');
const router = express.Router();

const controller = require('../controllers/reviewsController');

router.get('/', controller.index); // no lo usamos

router.post('/new', controller.newReview); // formulario de nueva review

router.post('/store', controller.checkBeforeStoringReview); // storea la review

router.post('/edit', controller.editReview); // formulario de edit review

router.post('/update', controller.checkBeforeUpdatingReview); // storea la review editada

router.get('/best', controller.bestReviews); // renderiza las reviews que dan mejor puntaje

router.get('/worst', controller.worstReviews); // renderiza las reviews que dan peor puntaje

router.get('/newest', controller.newestReviews); // renderiza las reviews mas nuevas

router.get('/series/:id', controller.seriesReviews); // reviews de una determinada serie

router.post('/delete/:id', controller.checkBeforeDeletingReview); // deletea una review

module.exports = router;
