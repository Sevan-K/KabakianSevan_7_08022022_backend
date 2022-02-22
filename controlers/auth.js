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
const jwt = require("jsonwebtoken");

// token maxAge in second (1h) !!!!!!!!!!! à vérifier
const tokenMaxAge = 1;
// cookie maxAge in mili second (1h)
const cookieMaxAge = tokenMaxAge * 60 * 60 * 1000;

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
      // errors messages are stored in a object that can be used by the front
      let errors = signUpErrors(err);
      // sending a response with a status code 200 and an errors object
      return res.status(200).json({ errors });
    } else {
      // sending a response with a status code 500 and an error message
      return res.status(err.status || 500).json({ error: err.message });
    }
  }
};

/* --------------------------------- */
/*      Login controler section      */
/* --------------------------------- */
exports.login = async (req, res, next) => {
  try {
    // look for the user with the same in database
    const userArray = await User.findAll({ where: { email: req.body.email } });
    // recovering the data from the array recieved
    const user = userArray[0];
    // handle case where user is not found
    if (user.length === 0) {
      const err = new Error("User not found !");
      return res.status(404).json({ error: err.message });
    }
    // boolean constant to check if password is valid
    const isPassWordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // if password deos not match
    if (!isPassWordValid) {
      const err = new Error("Password is not valid !");
      return res.status(401).json({ error: err.message });
    }
    // === > code below is accessible only if user is found and if password id valid
    // a token is signed with userId value (expire unit seconds)
    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
      expiresIn: `${tokenMaxAge}h`,
    });
    // set response status code to 200, add a cookie with the token (expire unit mili seconds)
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: cookieMaxAge,
        expires: new Date(Date.now() + cookieMaxAge),
        secure: true,
        sameSite: "lax",
      })
      .status(200)
      .json({ message: "Token cookie successfully sent !" });

    // generate a token with the}
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

/* ------------------------------------- */
/*      TokenToId controler section      */
/* ------------------------------------- */
exports.tokenToId = (req, res, next) => {
  // get cookie from the request
  const token = req.cookies.token;
  // console.log("=== tokentoid ===>", token);
  // if there is no cookie send an error message
  if (!token) {
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "No token found!" });
  }
  // decode the token within the cookie
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  // checking if decoded token is valid
  if (!decodedToken) {
    const err = new Error("Token is not valid !");
    return res.clearCookie("token").status(403).json({ error: err.message });
    // return res.clearCookie("token").end()
  }
  // response status code is set to 200 and userId is sent
  res.status(200).json({ userId: decodedToken.userId });
};

/* ---------------------------------- */
/*      LogOut controler section      */
/* ---------------------------------- */
exports.logout = (req, res, next) => {
  // get cookie from the request
  const token = req.cookies.token;
  //  if there is no token cookie it mean the user is not logged in
  if (!token) {
    const err = new Error("Not logged in !");
    return res.status(200).json({ error: err.message });
  }
  // clear cookie token
  res.clearCookie("token").end();
};
