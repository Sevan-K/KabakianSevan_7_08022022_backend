/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// express is required
const express = require("express");

// creating app as an express application
const app = express();

// routes are required
const authRoutes = require("./routes/auth");

// dotenv module is required
require("dotenv").config();

// cookies parser module is required
const cookieParser = require("cookie-parser");

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
// app.use("/api/auth/signup", (req, res, next) => {
//   console.log("Hello World");
//   res.status(200).json("Hello World");
// });

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

app.use("/api/auth", authRoutes);

// app is exported to be used in server file
module.exports = app;
