const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  mobileno: {
    required: true,
    type: Number,
  },
  admin: {
    required: true,
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
