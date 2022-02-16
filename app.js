/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// express is required
const express = require("express");

// creating app as an express application
const app = express();

// importing routes
const authRoutes = require("./routes/auth");

// importing dotenv module
require("dotenv").config();

/* ------------------------------------- */
/*      Mongoose connection section      */
/* ------------------------------------- */
// on se synchronyse avec la base de donnée
const db = require("./models");
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connection has been established successfully.");
    // ajouter le listen à l'intérieur
  })
  .catch((error) => console.log("Unable to connect to the database:", error));

/* ---------------------------- */
/*      Middleware section      */
/* ---------------------------- */
// app.use("/api/auth/signup", (req, res, next) => {
//   console.log("Hello World");
//   res.status(200).json("Hello World");
// });

// middleware to add header to responses
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// code to intercept request that have a JSON type content
app.use(express.json());

app.use("/api/auth", authRoutes);

// app is exported to be used in server file
module.exports = app;
