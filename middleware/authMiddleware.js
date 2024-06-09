const userModel = require("../models/userModel.js");

const authMiddleware = async (req, res, next) => {
    const sessionData = await req.sessionStore.get(req.sessionID); // Retrieve session data
    if (!sessionData || !sessionData.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
        const user = await userModel.findById(sessionData.userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user; // Attach user to request object for further use
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = authMiddleware;
