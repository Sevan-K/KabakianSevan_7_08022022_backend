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

// adding needed routes
router.get("/", readAllPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

// export router to use it in app file
module.exports = router;
