/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
const { User } = require("../models");
const fs = require("fs");

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
    if (req.auth.userId !== userIdToRead && req.auth.isAdmin === false) {
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
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* -------------------------------------- */
/*      UpdateUser controler section      */
/* -------------------------------------- */
exports.updateUser = async (req, res, next) => {
  try {
    // console.log("=== body ===>", req.body);
    // console.log("=== file ===>", !!req.file);
    // getting user object
    const userObject = req.file
      ? {
          ...JSON.parse(req.body.user),
          imageUrl: `${req.protocol}://${req.get("host")}/images/profile/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    // console.log("=== userObject ===>", userObject);

    // check auth to only allow a user to modify its own profile
    if (req.auth.userId !== userObject.id && req.auth.isAdmin === false) {
      return res
        .status(403)
        .json({ error: "Forbidden profile update request !" });
    }

    // supprimer l'ancier fichier si besoin
    if (!!req.file) {
      // looking for the user to update
      const [userToUpdate] = await User.findAll({
        where: { id: req.params.id },
      });
      // console.log("=== userToUpdate ===>", userToUpdate);
      // checking if the user is found
      if (!userToUpdate) {
        return res.status(404).json({ error: "User to update not found !" });
      }
      // if image Url exist
      if (!!userToUpdate.imageUrl) {
        // getting file name from image url
        const filenameToDelete = userToUpdate.imageUrl.split("profile/")[1];
        // console.log("=== filenameToDelete ===>", filenameToDelete);
        // using file system to delete the old image
        fs.unlink(`images/profile/${filenameToDelete}`, (err) => {
          if (!!err) {
            console.log("failed to delete local image" + err);
          }
        });
      }
    }
    // validation des champs
    // utiliser une regex mais pas nécessairement JOI

    // updating bio value on DB
    await User.update(
      { bio: userObject.bio },
      { where: { id: req.params.id } }
    );

    // updating imageUrl value on DB
    await User.update(
      { imageUrl: userObject.imageUrl },
      { where: { id: req.params.id } }
    );

    // sending a response with a status code 200 and user object
    res.status(200).json({ user: userObject });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* -------------------------------------- */
/*      DeleteUser controler section      */
/* -------------------------------------- */
exports.deleteUser = async (req, res, next) => {
  try {
    const idFromReqParams = parseInt(req.params.id, 10);
    // check auth to only allow a user to delete its own profile
    if (req.auth.userId !== idFromReqParams && req.auth.isAdmin === false) {
      return res
        .status(403)
        .json({ error: "Delete profile request forbidden!" });
    }

    // looking for the user to delete
    const [userToDelete] = await User.findAll({
      where: { id: idFromReqParams },
    });
    // console.log("=== userToDelete ===>", userToDelete);
    // checking if the user is found
    if (!userToDelete) {
      return res.status(404).json({ error: "User to delete not found !" });
    }
    // if image Url exist
    if (!!userToDelete.imageUrl) {
      // getting file name from image url
      const filenameToDelete = userToDelete.imageUrl.split("profile/")[1];
      // console.log("=== filenameToDelete ===>", filenameToDelete);
      // using file system to delete the old image
      fs.unlink(`images/profile/${filenameToDelete}`, (err) => {
        if (!!err) {
          console.log("failed to delete local image" + err);
        }
      });
    }

    // removing user from DB
    await User.destroy({ where: { id: idFromReqParams } });

    // sending a response with a status code 200, a message and clearcookie
    res.clearCookie("token").status(200).json({ message: "User deleted" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};
