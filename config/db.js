const mongoose = require('mongoose');
const env = require('./envConfig');
const connect = async () => {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(env.URL, {
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log('database connected!');
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
};

module.exports = connect;
