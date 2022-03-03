/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
const { Post } = require("../models");
const fs = require("fs");

/* ---------------------------------------- */
/*      readAllPosts controler section      */
/* ---------------------------------------- */
exports.readAllPosts = async (req, res, next) => {
  try {
    // look for all the post ordered by creation date
    const posts = await Post.findAll({
      order: [
        ["createdAt", "DESC"],
        ["id", "ASC"],
      ],
    });
    // console.log("=== posts ===>", posts);
    // sending a response with a status code 200 and posts
    res.status(200).json({ posts });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* -------------------------------------- */
/*      createPost controler section      */
/* -------------------------------------- */
exports.createPost = async (req, res, next) => {
  try {
    // creating postObject according to req.file presence
    const postObject = req.file
      ? {
          ...JSON.parse(req.body.post),
          imageUrl: `${req.protocol}://${req.get("host")}/images/post/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    // inserting new post on DB
    await Post.create(postObject);

    // sending a response with a status code 201 and a message
    res.status(201).json({ message: "Post successfully created !" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* -------------------------------------- */
/*      updatePost controler section      */
/* -------------------------------------- */
exports.updatePost = async (req, res, next) => {
  try {
    // get post id from req params
    const postIdFromReqParams = parseInt(req.params.id, 10);

    // looking for the user to delete
    const [postToUpdate] = await Post.findAll({
      where: { id: postIdFromReqParams },
    });
    // console.log("=== postToUpdate ===>", postToUpdate);

    // checking if the user is found
    if (!postToUpdate) {
      return res.status(404).json({ error: "Post to update not found !" });
    }

    // check auth to only allow a user to modify its own profile
    if (req.auth.userId !== postToUpdate.userId) {
      return res.status(403).json({ error: "Update post request forbidden !" });
    }

    // get updatedContent from request
    const updatedContent = req.body.content;
    // console.log("=== updatedContent ===>", updatedContent);

    // update post content where id is equal to the one in the request
    await Post.update(
      { content: updatedContent },
      { where: { id: postIdFromReqParams } }
    );

    // sending a response with a status code 200 and user object
    res.status(200).json({ message: "Post successfully updated !" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* -------------------------------------- */
/*      deletePost controler section      */
/* -------------------------------------- */
exports.deletePost = async (req, res, next) => {
  try {
    // get post id from req params
    const postIdFromReqParams = parseInt(req.params.id, 10);

    // looking for the user to delete
    const [postToDelete] = await Post.findAll({
      where: { id: postIdFromReqParams },
    });
    // console.log("=== postToDelete ===>", postToDelete);
    // checking if the user is found
    if (!postToDelete) {
      return res.status(404).json({ error: "Post to delete not found !" });
    }

    // check auth to only allow a user to delete its own profile
    if (req.auth.userId !== postToDelete.userId) {
      return res.status(403).json({ error: "Delete post request forbidden !" });
    }

    // if image Url exist
    if (!!postToDelete.imageUrl) {
      // getting file name from image url
      const filenameToDelete = postToDelete.imageUrl.split("post/")[1];
      // console.log("=== filenameToDelete ===>", filenameToDelete);
      // using file system to delete the old image
      fs.unlink(`images/post/${filenameToDelete}`, (err) => {
        if (!!err) {
          console.log("failed to delete local image" + err);
        }
      });
    }

    // removing user from DB
    await Post.destroy({ where: { id: postIdFromReqParams } });

    // sending a response with a status code 200, a message and clearcookie
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};
