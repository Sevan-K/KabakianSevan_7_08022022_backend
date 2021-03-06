// jsonwebtoken module import
const jwt = require("jsonwebtoken");

// exporting the authentification module
module.exports = (req, res, next) => {
  try {
    // get cookie from the request
    const token = req.cookies.token;
    // if there is no cookie send an error message
    if (!token) {
      return res
        .status(404)
        .json({ message: "No token found while atenticating route!" });
    }
    // decode the token within the cookie
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // checking if decoded token is valid
    if (!decodedToken) {
      const err = new Error("Token is not valid !");
      return res.clearCookie("token").status(403).json({ error: err.message });
    }

    // the userIdFromToken is added to the request
    req.auth = { userId: decodedToken.userId, isAdmin: decodedToken.isAdmin };
    // if there is a userId in request's body and if it is not the same than the one from the token
    if (req.body.userId && req.body.userId !== decodedToken.userId) {
      // we throw an error
      res.status(403).json({ error: "Invalid userId" });
    }
    // using a next to go to next middleware
    next();
  } catch (err) {
    // the error or a new message is sent
    res.status(400).json({ error: err.message });
  }
};
