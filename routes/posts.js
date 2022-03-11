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
  likePost,
  getPostLikes,
} = require("../controlers/posts");

// multer middleware is required
const multer = require("../middleware/postMulterConfig");

// auth middleware is required
const checkAuth = require("../middleware/checkAuth");

// adding needed routes
//  ===> post CRUD routes
router.get("/", checkAuth, readAllPosts);
router.post("/", checkAuth, multer, createPost);
router.put("/:id", checkAuth, multer, updatePost);
router.delete("/:id", checkAuth, deletePost);
//  ===> post routes related to likes
router.get("/like", getPostLikes);
router.post("/:id/like", likePost);

// export router to use it in app file
module.exports = router;
