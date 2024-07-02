const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/user-service').then(() => {
  console.log('Connected to MongoDB');
  app.listen(3002, () => {
    console.log('Auth Service running on port 3002');
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
