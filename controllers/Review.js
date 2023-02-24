const Review = require('../models/Reviews');

// GET all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('product user');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate('user');
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST a new review
exports.createReview = async (req, res) => {
  const review = new Review({
    rating: req.body.rating,
    comment: req.body.comment,
    product: req.body.product,
    user: req.body.user,
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET a specific review
exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      'product user',
    );
    if (review == null) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review == null) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await review.remove();
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
