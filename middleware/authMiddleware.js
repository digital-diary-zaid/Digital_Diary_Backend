const {sessionModel} = require("../models/session.js");

const authMiddleware = async(req, res, next) => {
  const userId = await sessionModel.find();
  if (!userId) {
    console.log("User", req.session.userId);
    return res.json({ message: "Unauthorized" });
  }
  next();
};

module.exports = authMiddleware;