const express = require('express');
const cors = require('cors');
const env = require('./config/envConfig');
const connect = require('./config/db');
const app = express();
const path = require('path');

//routes
const userRoutes = require('../backend/routes/userRoutes');
const categoryRoutes = require('../backend/routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { PORT } = require('./config/envConfig');
const port = process.env.PORT || 5000;
console.log(env);
//stripe api webhooks
app.post(
  '/api/webhook',
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);
// database connection
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Connect on Port ${PORT}`);
  });
});

// add middleware
app.use(express.json());
app.use(cors());

//user routes
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);
app.use('/api', reviewRoutes);

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});
