// express is required
const express = require("express");
const {
  readAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controlers/posts");

// create the router using the Router express method
const router = express.Router();

// adding needed routes
router.get("/", readAllPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

// export router to use it in app file
module.exports = router;
