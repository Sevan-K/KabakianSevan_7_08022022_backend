/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// User model is required
// const { User } = require("../models");

// bcryp module is required to hash password
const bcryp = require("bcrypt");

// jwt module is requiered to generate a token
const jwt = require("json-web-token");

/* ---------------------------------- */
/*      Signup controler section      */
/* ---------------------------------- */
exports.signup = (req, res, next) => {
  try {
    // getting salt value from env
    const salt = parseInt(process.env.SALT, 10);
    const userToCreate = {
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password,
    };
    res.status(200).json({userToCreate});
  } catch (err) {
    res.status(400).json(err);
  }
};

/* --------------------------------- */
/*      Login controler section      */
/* --------------------------------- */
exports.login = (req, res, next) => {};
