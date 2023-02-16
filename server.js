const express = require('express');
const cors = require('cors');
const env = require('./config/envConfig');
const connect = require('./config/db');
const app = express();

//routes
const userRoutes = require('../backend/routes/userRoutes');
const categoryRoutes = require('../backend/routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/orderRoutes');

console.log(env);

// database connection
connect();

//stripe api webhooks
app.post(
  '/api/webhook',
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);

// add middleware
app.use(express.json());
app.use(cors());

//user routes
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to LNC system' });
});

const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(`We are live on  port  ${port}`);
});
