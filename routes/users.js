// express is required
const express = require("express");

// create the router using the Router express method
const router = express.Router();

// authenticate middleware is required
const checkAuth = require("../middleware/checkAuth");

// multer middleware
const multer = require("../middleware/multer-config");

// users controler are imported
const {
  readAllUsers,
  readOneUser,
  updateUser,
  deleteUser,
} = require("../controlers/users");

// adding needed routes
router.get("/", checkAuth, readAllUsers);
router.get("/:id", checkAuth, readOneUser);
router.put("/:id", multer, checkAuth, updateUser);
router.delete("/id", checkAuth, deleteUser);

// export router to use it in app file
module.exports = router;
