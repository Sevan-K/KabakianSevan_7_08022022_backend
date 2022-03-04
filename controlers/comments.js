/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
const { Comment } = require("../models");
/* ------------------------------------------- */
/*      readAllComments controler section      */
/* ------------------------------------------- */
exports.readAllComments = async (req, res, nex) => {
  try {
    // look for all comments from the oldest to the youngest
    const comments = await Comment.findAll({ order: [["createdAt"]] });
    // sending a response with a status code 200 and the comments
    res.status(200).json({ comments });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ----------------------------------------- */
/*      createComment controler section      */
/* ----------------------------------------- */
exports.createComment = async (req, res, nex) => {
  try {
    // building comment object
    const commentObject = { ...req.body };
    // console.log("=== commentObject ===>", commentObject);

    // inserting comment in DB
    await Comment.create(commentObject);

    // sending a response with a status code 201 and a message
    res.status(201).json({
      message: "Comment successfully created !",
    });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ----------------------------------------- */
/*      updateComment controler section      */
/* ----------------------------------------- */
exports.updateComment = async (req, res, nex) => {
  try {
    // get commentId from request params
    const commentId = req.params.id;

    // looking for the comment to update
    const [commentToUpdate] = await Comment.findAll({
      where: { id: commentId },
    });
    // console.log("=== commentToUpdate ===>", commentToUpdate);

    // checking if the comment is found
    if (!commentToUpdate) {
      return res.status(404).json({ error: "Comment to update not found !" });
    }

    // check auth to only allow a user to delete its own profile
    if (req.auth.userId !== commentToUpdate.userId) {
      return res
        .status(403)
        .json({ error: "Delete comment request forbidden !" });
    }

    // get updatedContent from request
    const updatedContent = req.body.content;
    // console.log("=== updatedContent ===>", updatedContent);

    // update comment which id is the same than the one on request params
    await Comment.update(
      { content: updatedContent },
      { where: { id: commentId } }
    );

    // sending a response with a status code 200 and the comments
    res
      .status(200)
      .json({ message: "Comment's content successfully updated !" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ----------------------------------------- */
/*      deleteComment controler section      */
/* ----------------------------------------- */
exports.deleteComment = async (req, res, nex) => {
  try {
    // get commentId from request params
    const commentId = req.params.id;
    console.log("=== commentId ===>", commentId);


    // looking for the comment to delete
    const [commentToDelete] = await Comment.findAll({
      where: { id: commentId },
    });
    console.log("=== commentToDelete ===>", commentToDelete);

    // checking if the comment is found
    if (!commentToDelete) {
      return res.status(404).json({ error: "Comment to delete not found !" });
    }

    // check auth to only allow a user to delete its own profile
    if (req.auth.userId !== commentToDelete.userId) {
      return res
        .status(403)
        .json({ error: "Delete comment request forbidden !" });
    }

    // removing the comment with the same id than the one in request params from DB
    await Comment.destroy({ where: { id: commentId } });

    // sending a response with a status code 200 and the comments
    res.status(200).json({ message: "Comment successfully deleted !" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};
