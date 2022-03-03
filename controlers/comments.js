/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */

/* ------------------------------------------- */
/*      readAllComments controler section      */
/* ------------------------------------------- */
exports.readAllComments = async (req, res, nex) => {
  try {
    // sending a response with a status code 200 and the comments
    res.status(200).json({ message: "test" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ----------------------------------------- */
/*      createComment controler section      */
/* ----------------------------------------- */
exports.createComment = (req, res, nex) => {
  try {
    // sending a response with a status code 200 and the comments
    res.status(200).json({ message: "test" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ----------------------------------------- */
/*      updateComment controler section      */
/* ----------------------------------------- */
exports.updateComment = (req, res, nex) => {
  try {
    // sending a response with a status code 200 and the comments
    res.status(200).json({ message: "test" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ----------------------------------------- */
/*      deleteComment controler section      */
/* ----------------------------------------- */
exports.deleteComment = (req, res, nex) => {
  try {
    // sending a response with a status code 200 and the comments

    res.status(200).json({ message: "test" });
  } catch (err) {
    // sending a response with a status code 500 and an error message
    res.status(err.status || 500).json({ error: err.message });
  }
};
