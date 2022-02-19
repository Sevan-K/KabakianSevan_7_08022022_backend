// express is required
const express = require("express");

// create the router using the Router express method
const router = express.Router();

// users controler are imported
const { readAllUsers } = require("../controlers/users");

// adding needed routes
router.get("/", readAllUsers);

// export router to use it in app file
module.exports = router;
