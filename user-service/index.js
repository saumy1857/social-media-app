const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use('/api', userRoutes);


mongoose.connect('mongodb://localhost:27017/user-service').then(() => {
  console.log('Connected to MongoDB');
  app.listen(3001, () => {
    console.log('User Service running on port 3001');
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
