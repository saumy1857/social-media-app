const express = require('express');
const mongoose = require('mongoose');
const followRoutes = require('./routes/followRoutes');

const app = express();

app.use(express.json());
app.use('/api', followRoutes);

mongoose.connect('mongodb://localhost:27017/follow-service').then(() => {
  console.log('Connected to MongoDB');
  app.listen(3005, () => {
    console.log('Follow Service running on port 3005');
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
