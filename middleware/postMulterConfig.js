// multer module import
const multer = require("multer");

// MIME_TYPES library creation
const MIME_TYPES = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
};

// creation multer'config object to save on disk
const storage = multer.diskStorage({
  // setting destination file
  destination: (req, file, callback) => {
    // image file is the destination
    callback(null, "images/post");
  },
  filename: (req, file, callback) => {
    // console.log("req from multer", req);
    // changing filename, replacing all " " by "_" and leaving extention
    const name = file.originalname.split(" ").join("_").split(".")[0];
    // get extention using MIME_TYPES
    const extention = MIME_TYPES[file.mimetype];
    // building filname throuth the callback
    callback(null, name + Date.now() + "." + extention);
  },
});

// multer middleware is exported using multer method (with storage object as argument)
module.exports = multer({ storage }).single("image");
