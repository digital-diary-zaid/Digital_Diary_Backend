const { sessionModel } = require("../models/session.js");

const authMiddleware = async (req, res, next) => {
    try {
        const sessionId = req.sessionID;
        const session = await sessionModel.findOne({ _id: sessionId });

        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.userId = session.userId;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: "Error checking authentication" });
    }
};

module.exports = authMiddleware;
