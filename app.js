/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// express is required
const express = require("express");

// creating app as an express application
const app = express();

// routes are required
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

// dotenv module is required
require("dotenv").config();

// cookies parser module is required
const cookieParser = require("cookie-parser");

// path package is required
const path = require("path");

const helmet = require("helmet");

// const cors = require("cors");

/* ------------------------------------- */
/*      Mongoose connection section      */
/* ------------------------------------- */
// on se synchronyse avec la base de donnée
const db = require("./models");

db.sequelize
  .sync()
  // .sync({alter:true})
  .then(() => {
    console.log("Synchronisation has been established successfully.");
    // ajouter le listen à l'intérieur
  })
  .catch((error) =>
    console.log("Unable to Synchronisation with the database:", error)
  );

/* ---------------------------- */
/*      Middleware section      */
/* ---------------------------- */
// helmet middleware
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy(
    //setting crossOriginResourcePolicy to cross-origin to avoid conflict with the header we set later
    { policy: "cross-origin" }
  )
);

// middleware to add header to responses
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-PINGOTHER, sessionId"
  );
  res.setHeader("Access-Control-Exposed-Headers", "sessionId");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// code to intercept request that have a JSON type content
app.use(express.json());

// add the cookie-parser
app.use(cookieParser());

// setting the destination file to serve when /images/profile route is used
app.use(
  "/images/profile",
  express.static(path.join(__dirname, "images/profile"))
);
// setting the destination file to serve when /images/post route is used
app.use("/images/post", express.static(path.join(__dirname, "images/post")));

// setting common path for each routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

// app is exported to be used in server file
module.exports = app;
