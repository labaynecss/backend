const mongoose = require('mongoose');
const env = require('./envConfig');

const connect = async () => {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connect;
