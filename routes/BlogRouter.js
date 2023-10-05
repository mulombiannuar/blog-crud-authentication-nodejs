const express = require("express");
const router = express.Router();

const BlogController = require("../controllers/BlogController");

router.get("/create", BlogController.create);
router.get("/:id/edit", BlogController.edit);
router.get("/:id", BlogController.show);
router.post("/", BlogController.store);
router.get("/", BlogController.index);
router.put("/:id", BlogController.update);
router.delete("/:id", BlogController.destroy);

module.exports = router;
