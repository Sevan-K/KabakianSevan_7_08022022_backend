/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
const { Post } = require("../models");

/* --------------------------------------- */
/*      readAllPosts controler section      */
/* --------------------------------------- */
exports.readAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    console.log("=== posts ===>", posts);
    // sending a response with a status code 200 and posts
    res.status(200).json({ posts });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* --------------------------------------- */
/*      createPost controler section      */
/* --------------------------------------- */
exports.createPost = async (req, res, next) => {
  try {
    // check if user is authenticated

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

    // sending a response with a status code 200 and a message
    res.status(201).json({ message: "Post successfully created !" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* --------------------------------------- */
/*      updatePost controler section      */
/* --------------------------------------- */
exports.updatePost = async (req, res, next) => {};

/* --------------------------------------- */
/*      deletePost controler section      */
/* --------------------------------------- */
exports.deletePost = async (req, res, next) => {};
