const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h' // Optional: set session expiration time (e.g., 1 hour)
    }
});

const Session = mongoose.model('Session', sessionSchema);

const createSession = async (userId, token) => {
    try {
        const session = new Session({ userId, token });
        await session.save();
        console.log('Session created:', session);
    } catch (error) {
        console.error('Error creating session:', error);
    }
};

const deleteSession = async (token) => {
    try {
        await Session.findOneAndDelete({ token });
        console.log('Session deleted');
    } catch (error) {
        console.error('Error deleting session:', error);
    }
};

const getSession = async (token) => {
    try {
        return await Session.findOne({ token });
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
};

module.exports = { Session, createSession, deleteSession, getSession };
