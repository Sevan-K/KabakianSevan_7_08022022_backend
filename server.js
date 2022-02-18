/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// http package is required
const http = require("http");
// app is required from app file
const app = require("./app");

/* --------------------------------- */
/*      Port definition section      */
/* --------------------------------- */
// function to normalize port
const normalizePort = (val) => {
  // transform a value and into an integer (base 10)
  const port = parseInt(val, 10);
  // if the port is not a number
  if (isNaN(port)) {
    // return the value (adress)
    return val;
  }
  // if the port is superior to 0
  if (port >= 0) {
    return port;
  }
  // otherwise return false
  return false;
};

// setting port value
const port = normalizePort(process.env.PORT || 3000);

// setting port for the app
app.set("port", port);

/* --------------------------------- */
/*      Server creation section      */
/* --------------------------------- */
// creating server from app using http
const server = http.createServer(app);

// function to look for and handle errors
const errorHandler = (error) => {
  if (error.sycall !== "listen") {
    throw error;
  }
  // geting server's address
  const address = server.address();
  // defining the bind
  const bind = typeof address === "string" ? "pipe" + address : "port:" + port;
  console.log(bind);
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// function to display the port listened
const listeningHandler = () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port:" + port;
  console.log("Listening on " + bind);
};

// écouteur d'évènement de type erreur et listening
server.on("error", errorHandler);
server.on("listening",listeningHandler)

// setting port to listen for the server
server.listen(port);