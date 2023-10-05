//import UserModel from "../models/UserModel";
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const creatError = require("http-errors");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validation/AuthValidation");

const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt");

// Registering a new User
const registerUser = async (req, res) => {
  //Validate request
  const { error } = registerUserValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({ status: "failed", message: error.details[0].message });

  const { name, password, email, mobile_no } = req.body;

  //Check if user already exists
  const emailExist = await UserModel.findOne({ email: email });
  if (emailExist)
    return res.status(400).send({
      status: "failed",
      message: "User with that email already exists",
    });

  try {
    const newUser = new UserModel({
      name,
      email,
      mobile_no,
      password,
    });

    const savedUser = await newUser.save();
    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);

    res.status(200).json({
      status: "success",
      message: "Signup successful",
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login User
const loginUser = async (req, res) => {
  //Validate request

  const { error } = loginUserValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({ status: "failed", message: error.details[0].message });
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    //return res.status(200).json(user);
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword)
        return res
          .status(400)
          .json({ status: "failed", message: "Password is incorrect" });

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      res.status(200).json({
        status: "success",
        message: "Signin successful",
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } else {
      res
        .status(404)
        .json({ status: "failed", message: "Email or password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) throw creatError.BadRequest();

    const userId = await verifyRefreshToken(refresh_token);

    const accessToken = await signAccessToken(userId);
    const refreshToken = await signRefreshToken(userId);

    res.status(200).json({
      status: "success",
      message: "Tokens generated successful",
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.loginUser = loginUser;
module.exports.registerUser = registerUser;
module.exports.refreshToken = refreshToken;
