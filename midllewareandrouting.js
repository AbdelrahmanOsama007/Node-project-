const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const teachersroute = require("./route/TeacherRoute");
const childsroute = require("./route/childroute");
const classroute = require("./route/classrout");
const upload = require("./midllewares/img");
const connectdbdb = require("./model/db");
const { verifyToken } = require("./midllewares/authenticationMiddleware");
const authRoute = require("./route/authroute");
const swagger = require("./swagger");
// const AutoIncrement = require("mongoose-sequence")(mongoose);
//const AutoIncrementFactory = require("mongoose-sequence");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Use Morgan middleware with the 'combined' format
app.use(morgan("combine"));
// parse application/json
app.use(express.json());
// cors for cross origin request
app.use(cors());
connectdbdb(process.env.url); // Connect to MongoDB database using Mongoose
//AutoIncrement = AutoIncrementFactory(connectdbdb);

swagger(app, port);
// Define routes

// Middleware to log authorization status
app.use((req, res, next) => {
  // Assuming authorization logic here
  console.log("authorized");
  next();
});

// Middleware to log the current time
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

// Routing for GET request to root

app.use(authRoute);
app.use(verifyToken);
app.use(teachersroute);
app.use(childsroute);
app.use(classroute);
app.post("/upload", upload.single("image"), (req, res, next) => {
  res.json({ message: "uplaoded" });
});
// app.use("route/route.js", (req, res) => {
//   res.json({ message: "Hello World!" });
// });

// Not found middleware
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "/public/404.html"));
});

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ status: "error", message: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
