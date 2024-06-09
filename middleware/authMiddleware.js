const { getSession } = require("../models/session.js");

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("req:", req)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const session = await getSession(token);

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
