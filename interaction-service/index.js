const express = require('express');
const mongoose = require('mongoose');
const interactionRoutes = require('./routes/interactionRoutes');

const app = express();

app.use(express.json());
app.use('/api', interactionRoutes);

mongoose.connect('mongodb://localhost:27017/interaction-service').then(() => {
  console.log('Connected to MongoDB');
  app.listen(3004, () => {
    console.log('Interaction Service running on port 3004');
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
