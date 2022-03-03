// express is required
const express = require("express");

// create the router using the Router express method
const router = express.Router();

// controler middleware are required
const {
  readAllComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controlers/comments");

// auth middleware is required
// const checkAuth = require("../middleware/checkAuth");

// adding needed routes
router.get("/",/* checkAuth, */ readAllComments);
router.post("/", /* checkAuth, */ createComment);
router.put("/:id", /* checkAuth, */ updateComment);
router.delete("/:id", /* checkAuth, */ deleteComment);

// export router to use it in app file
module.exports = router;