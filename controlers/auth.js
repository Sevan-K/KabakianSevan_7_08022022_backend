/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// User model is required
const { User } = require("../models");

// error handeling function import
const { signUpErrors } = require("../utils/authErrors");

// bcryp module is required to hash password
const bcrypt = require("bcrypt");

// jwt module is requiered to generate a token
const jwt = require("json-web-token");

/* ---------------------------------- */
/*      Signup controler section      */
/* ---------------------------------- */
exports.signup = async (req, res, next) => {
  try {
    // getting salt value from env
    const salt = parseInt(process.env.SALT, 10);
    // waiting for the hash of the password
    const hash = await bcrypt.hash(req.body.password, salt);
    // building the user to create
    const userToCreate = {
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash,
    };
    // inserting the user into the database
    await User.create(userToCreate);
    // sending a response with a status code 201 and a message
    res.status(201).json({ message: "User successfully created !" });
  } catch (err) {
    // if there is a validation error
    if (err.errors) {
      console.log("=== errors ===>", err.errors);
      // errors messages are stored in a object that can be used by the front
      let errors = signUpErrors(err);
      // sending a response with a status code 400 and an errors object
      res.status(400).json({ errors });
    } else {
      // sending a response with a status code 500 and an error message
      res.status(500).json({ error: err.message });
    }
  }
};

/* --------------------------------- */
/*      Login controler section      */
/* --------------------------------- */
exports.login = (req, res, next) => {
  // look for the user with the same
};
