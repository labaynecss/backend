const { body } = require('express-validator');
module.exports.registerValidations = [
  body('name').not().isEmpty().trim().escape().withMessage('name is required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage('email is required'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('password should be 5 characters long'),
  body('mobileno')
    .isLength({ min: 11 })
    .isLength({ max: 11 })
    .withMessage('mobile number should be 11 digits long'),
];

module.exports.loginValidations = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage('email is required'),
  body('password').not().isEmpty().withMessage('password is required'),
];
