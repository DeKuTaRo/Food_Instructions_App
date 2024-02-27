const mongoose = require('mongoose');
const { MONGODB_URL } = require('../config');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
