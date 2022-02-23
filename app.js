/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// express is required
const express = require("express");

// creating app as an express application
const app = express();

// routes are required
const authRoutes = require("./routes/auth");
const usersRoute = require("./routes/users");

// dotenv module is required
require("dotenv").config();

// cookies parser module is required
const cookieParser = require("cookie-parser");

// path package is required
const path = require("path");

// const cors = require("cors");

/* ------------------------------------- */
/*      Mongoose connection section      */
/* ------------------------------------- */
// on se synchronyse avec la base de donnée
const db = require("./models");
// db.sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//     // ajouter le listen à l'intérieur
//   })
//   .catch((error) => console.log("Unable to connect to the database:", error));

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

// const corsOptions = {
//   origin: process.env.CLIENT_URL,
//   credentials: true,
//   allowedHeaders: ["sessionId", "Content-Type"],
//   exposedHeaders: ["sessionId"],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
// };
// app.use(cors(corsOptions));

// code to intercept request that have a JSON type content
app.use(express.json());

// add the cookie-parser
app.use(cookieParser());

// setting the destination file to serve when /images/profile route is used
app.use(
  "/images/profile",
  express.static(path.join(__dirname, "images/profile"))
);

// setting common path for each routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoute);

// app is exported to be used in server file
module.exports = app;
