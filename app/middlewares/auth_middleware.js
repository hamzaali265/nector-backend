const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    console.error(req.header("Authorization"));
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.split(" ")[1], "your-secret-key");

    // Check if user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
