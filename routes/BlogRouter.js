const express = require("express");
const router = express.Router();

const BlogController = require("../controllers/BlogController");

router.get("/create", BlogController.create);
router.get("/:id", BlogController.show);
router.get("/", BlogController.index);
router.put("/:id", BlogController.update);
router.delete("/:id", BlogController.destroy);

module.exports = router;
