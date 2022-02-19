// jsonwebtoken module import
const jwt = require("jsonwebtoken");

// exporting the authentification module
module.exports = (request, response, next) => {
  try {
    // the token is extracted from the header of the request
    const token = request.headers.authorization.split(" ")[1];
    // the token is decoded using jwt verify method
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // we get the userID inside the token
    const userIdFromToken = decodedToken.userId;
    // the userIdFromToken is added to the request
    request.auth = { userId: userIdFromToken };
    // if there is a userId in request's body and if it is not the same than the one from the token
    if (request.body.userId && request.body.userId !== userIdFromToken) {
      // we throw an error
      throw "Invalid userId";
    }
    // using a next to go to next middleware
    next();
  } catch {
    // the error or a new message is sent
    response.status(401).json({ error: new Error("Invalid request !") });
  }
};

// ajouter la logiquer pour valider la présence d'un cookie valide
