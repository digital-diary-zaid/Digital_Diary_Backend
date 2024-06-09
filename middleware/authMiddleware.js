const authMiddleware = (req, res, next) => {
    console.log('authMiddleware called');
    console.log('Session after authMiddleware:', req.session); 
    if (!req.session.userId) {
     // Log the entire session object
      return res.json({ message: "Unauthorized" });
    }
    next();
  };
  
  module.exports = authMiddleware;
  