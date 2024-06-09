const mongoose = require('mongoose');

// Define the schema for the session collection
const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' // Optional: Automatically remove the session after 7 days
    }
});

// Create a model for the session collection
const sessionModel = mongoose.model('Session', sessionSchema);

// Function to get session by token
const getSession = async (token) => {
    try {
        const session = await sessionModel.findOne({ token });
        return session;
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
};

// Create a new session document when user logs in
const createSession = async (userId, token) => {
    try {
        const session = new sessionModel({ userId, token });
        await session.save();
        console.log('Session created:', session);
        return session;
    } catch (error) {
        console.error('Error creating session:', error);
        return null;
    }
};

// Delete a session document when user logs out or session expires
const deleteSession = async (token) => {
    try {
        await sessionModel.findOneAndDelete({ token });
        console.log('Session deleted');
    } catch (error) {
        console.error('Error deleting session:', error);
    }
};

module.exports = { sessionModel, getSession, createSession, deleteSession };
