const mongoose = require('mongoose');

// Define the schema for the session collection
const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Optional: set session expiration time (e.g., 1 hour)
    }
});

// Create a model for the session collection
const sessionModel = mongoose.model('Session', sessionSchema);

const createSession = async (userId) => {
    try {
        const session = new sessionModel({ userId });
        await session.save();
        console.log('Session created:', session);
    } catch (error) {
        console.error('Error creating session:', error);
    }
};

const deleteSession = async (sessionId) => {
    try {
        await sessionModel.findByIdAndDelete(sessionId);
        console.log('Session deleted');
    } catch (error) {
        console.error('Error deleting session:', error);
    }
};

module.exports = { sessionModel, createSession, deleteSession };
