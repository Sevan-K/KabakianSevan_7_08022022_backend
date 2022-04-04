/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// express is required
const express = require("express");

// creating routes as an express application
const routes = express();

// routes are required
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

/* ---------------------------- */
/*      Middleware section      */
/* ---------------------------- */
// setting common path for each routes
routes.use("/api/auth", authRoutes);
routes.use("/api/users", usersRoutes);
routes.use("/api/posts", postsRoutes);
routes.use("/api/comments", commentsRoutes);

// app is exported to be used in server file
module.exports = routes;
