const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/Review');

// GET all reviews
router.get('/reviews', reviewController.getAllReviews);

// POST a new review
router.post('/reviews', reviewController.createReview);

// GET a specific review
router.get('/reviews/:id', reviewController.getReview);

// DELETE a review
router.delete('/reviews/:id', reviewController.deleteReview);

router.get('/reviews/:productId', reviewController.getReviewsByProductId);

module.exports = router;
