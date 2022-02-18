// express is required
const express = require("express");

// create the router using the Router express method
const router = express.Router();

// authentification controler are imported
const { signup, login, tokenToId, logout } = require("../controlers/auth");

// adding needed routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/tokentoid", tokenToId);
router.get("/logout", logout);

// export router to use it in app file
module.exports = router;
