require('dotenv').config();
const mongoose = require('mongoose');
const DBURL = process.env.DBURL;
mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Export the Mongoose connection
module.exports = mongoose.connection;