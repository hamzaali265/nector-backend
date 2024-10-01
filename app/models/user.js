const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
    },
  ],
  deliveryAddresses: [
    {
      type: String,
    },
  ],
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

// Joi validation schema for user creation
const validateUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8), // Minimum length of 8 characters
  phoneNumber: Joi.string().optional().allow(""),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8), // Minimum length of 8 characters
});

// Joi validation schema for user login
function loginValidater(data) {
  return loginSchema.validate(data);
}

module.exports = {
  User: mongoose.model("User", userSchema),
  validateUser: validateUser,
  loginValidater: loginValidater,
};
