const { User, loginValidater } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User login
const login = async (req, res) => {
  try {
    const { error } = loginValidater(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key");
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      profileImage: user.profileImage,
      token: token,
    };
    return res.json({ message: "Login successful", user: data });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
