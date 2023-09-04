const express = require("express");
const router = express.Router();

const PageController = require("../controllers/PageController");

router.get("/", PageController.home);
router.get("/about", PageController.about);
router.get("/login", PageController.login);
router.get("/signup", PageController.signup);
router.get("/forgot-password", PageController.forgot_password);

module.exports = router;
