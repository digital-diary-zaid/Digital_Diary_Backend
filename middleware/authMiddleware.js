const authMiddleware = (req, res, next) => {
    console.log('authMiddleware called',req.session.userId);
    console.log('Session after authMiddleware:', req.session); // Log the entire session object
    if (!req.session.userId) {
      return res.json({ message: "Unauthorized" });
    }
    next();
  };
  
  module.exports = authMiddleware;
  