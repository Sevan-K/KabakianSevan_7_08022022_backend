/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
const { Post_User } = require("../models");

/* ------------------------------------ */
/*      readPostLikes controler section      */
/* ------------------------------------ */
exports.readPostLikes = async (req, res, next) => {
  try {
    // get all users'id liking this post
    const postLikes = await Post_User.findAll();

    // sending a response with a status code 200, a message
    res.status(200).json({ postLikes });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ------------------------------------ */
/*      likePost controler section      */
/* ------------------------------------ */

exports.likePost = async (req, res, next) => {
  try {
    // get post id from req params
    const postIdFromReqParams = parseInt(req.params.id, 10);

    // get id of user liking post
    const userId = req.auth.userId;

    // get all users'id liking this post
    const likingUsers = await Post_User.findAll({
      where: { postId: postIdFromReqParams },
    });

    // constant to check if user is already liking this post
    const isUserLiking = likingUsers.reduce(
      (acc, postUserObject) =>
        postUserObject.userId === userId ? (acc = true) : acc,
      false
    );
    // console.log("=== isUserLiking ===>", isUserLiking);

    // if post is already liked send an error status and a message
    if (isUserLiking) {
      return res
        .status(400)
        .json({ message: "Post already liked by this user !" });
    }

    // adding couple postId / userId to the DB
    Post_User.create({ postId: postIdFromReqParams, userId });

    res.status(201).json({
      message: "Post successfully liked !",
    });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* -------------------------------------- */
/*      unlikePost controler section      */
/* -------------------------------------- */
exports.unlikePost = async (req, res, next) => {
  try {
    // get post id from req params
    const postIdFromReqParams = parseInt(req.params.id, 10);

    // get id of user liking post
    const userId = req.auth.userId;

    // get all users'id liking this post
    const likingUsers = await Post_User.findAll({
      where: { postId: postIdFromReqParams },
    });

    // constant to check if user is already liking this post
    const isUserLiking = likingUsers.reduce(
      (acc, postUserObject) => (acc = postUserObject.userId === userId),
      false
    );
    // console.log("=== isUserLiking ===>", isUserLiking);

    // if post is not liked send an error status and a message
    if (!isUserLiking) {
      return res
        .status(400)
        .json({ message: "Post is not liked by this user !" });
    }

    // removing couple postId / userId from the DB
    Post_User.destroy({
      where: { postId: postIdFromReqParams, userId: userId },
    });

    // sending a response with a status code 200, a message
    res.status(200).json({ message: "Post successfully unliked !" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};
