const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb://localhost:27017/blog`);
      console.log(`MongoDB Connected Successfully`);
    } catch (error) {
      console.error(error.message);
    }
  }
  module.exports= connectDB;