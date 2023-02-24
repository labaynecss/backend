const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/userController');
const {
  registerValidations,
  loginValidations,
} = require('../validations/userValidation');

router.post('/register', registerValidations, register);
router.post('/login', loginValidations, login);

module.exports = router;
