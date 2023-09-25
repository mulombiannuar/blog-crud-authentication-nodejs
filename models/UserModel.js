const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");

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
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    mobile_number: {
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

// const UserModel = mongoose.model("Users", UserSchema);
// export default UserModel;

module.exports = mongoose.model("Users", UserSchema);
