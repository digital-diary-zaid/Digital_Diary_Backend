const mongoose = require('mongoose');
require('dotenv').config();

const dbInit = async () => {
  try {
    await mongoose.connect(process.env.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

dbInit();

module.exports = dbInit;
