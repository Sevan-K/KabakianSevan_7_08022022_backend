/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
const { User } = require("../models");

/* ---------------------------------------- */
/*      ReadAllUsers controler section      */
/* ---------------------------------------- */
exports.readAllUsers = (req, res, next) => {
  // !!!!!!!!!!!! route à protéger pour être accessible seulement aux admin
  // find all users in database
  User.findAll()
    // take the users and send them on the response
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).json({ error: "No user found" });
      }
      res.status(200).json({ users });
    })
    // catch eventual errors an send a response with and error status
    .catch((err) => res.status(err.status || 400).json({ error: err.message }));
};

/* --------------------------------------- */
/*      ReadOneUser controler section      */
/* --------------------------------------- */
exports.readOneUser = async (req, res, next) => {
  try {
    // the concerned id is recoverd from request parameters
    const userIdToRead = parseInt(req.params.id, 10);
    // check if userId from the decoded token is the same than the one to read
    if (req.auth.userId !== userIdToRead) {
      return res
        .status(403)
        .json({ error: "You do not have access to that content !" });
    }
    // find the user based on its id
    const userArray = await User.findAll({ where: { id: userIdToRead } });
    // get the items stored into
    const user = userArray[0];
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // sending a response with a status code 200 and user object
    res.status(200).json({ user });
  } catch (err) {
    // sending a response with a status code 400 and an error message
    res.status(err.status || 400).json({ error: err.message });
  }
};

/* -------------------------------------- */
/*      UpdateUser controler section      */
/* -------------------------------------- */
exports.updateUser = (req, res, next) => {
  try {
    // console.log("=== body ===>", req.body);
    // console.log("=== file ===>", !!req.file);
    // getting user object
    const userObject = req.file
      ? {
          ...JSON.parse(req.body.user),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    console.log("=== userObject ===>", userObject);

    // check auth

    // supprimer l'ancier fichier si besoin

    // validation des champs

    // enregistrer l'utilisateur dans la BDD

    res.status(200).json({ user: userObject });
  } catch (err) {
    // sending a response with a status code 400 and an error message
    res.status(err.status || 400).json({ error: err.message });
  }
};

/* -------------------------------------- */
/*      DeleteUser controler section      */
/* -------------------------------------- */
exports.deleteUser = (req, res, next) => {};
