const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; // Fetch URI from .env
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in the .env file");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error', error);
    process.exit(1); // Exit the process if unable to connect
  }
};

module.exports = connectDB;
