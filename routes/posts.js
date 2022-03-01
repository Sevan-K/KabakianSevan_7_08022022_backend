// express is required
const express = require("express");

// create the router using the Router express method
const router = express.Router();

// controler middleware are required
const {
  readAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controlers/posts");

// multer middleware is required
const multer = require("../middleware/postMulterConfig");

// adding needed routes
router.get("/", readAllPosts);
router.post("/", multer, createPost);
router.put("/:id", multer, updatePost);
router.delete("/:id", deletePost);

// export router to use it in app file
module.exports = router;
