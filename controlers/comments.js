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

    // removing the comment with the same id than the one in request params from DB
    await Comment.destroy({ where: { id: commentId } });

    // sending a response with a status code 200 and the comments
    res.status(200).json({ message: "Comment successfully deleted !" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};
