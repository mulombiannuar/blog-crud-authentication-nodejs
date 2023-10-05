const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    mobile_no: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    accessibility: {
      type: Number,
      default: 1,
    },
    password: {
      type: String,
      required: true,
    },
    email_verified_at: {
      type: String,
      default: null,
    },
    user_image: {
      type: String,
      default: "avatar.png",
    },
  },
  { timestamps: true }
);

// save middleware to hash password
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    console.log(`Password has been hashed to ${hashedPassword}`);
    next();
  } catch (error) {
    next(error);
  }
});

// compare password to hash password one
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Users", UserSchema);
