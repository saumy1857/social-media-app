const express = require('express');
const mongoose = require('mongoose');
const discussionRoutes = require('./routes/discussionRoutes');

const app = express();

app.use(express.json());
app.use('/api', discussionRoutes);

mongoose.connect('mongodb://localhost:27017/discussion-service').then(() => {
  console.log('Connected to MongoDB');
  app.listen(3003, () => {
    console.log('Discussion Service running on port 3003');
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
