const express = require("express");
const { Console } = require("console");
const fs = require("fs");

const app = express();

// Create a new instance of the Console class with custom output destinations
const output = fs.createWriteStream("./stdout.log");
const errorOutput = fs.createWriteStream("./stderr.log");
const logger = new Console({
  stdout: output,
  stderr: errorOutput,
  inspectOptions: {
    colors: true,
    depth: 4,
    maxArrayLength: 100,
    breakLength: 80,
  },
  debug: (msg, ...args) => {
    console.log("\x1b[36m%s\x1b[0m", `[DEBUG] ${msg}`, ...args);
  },
});
// Create a middleware function to log each request
app.use((req, res, next) => {
  const { method, originalUrl } = req;
  logger.log(`${method} ${originalUrl}`);
  next();
});

// Define a route to fetch a list of users
app.get("/users", (req, res) => {
  logger.debug("Fetching users");
  User.find((err, users) => {
    if (err) {
      logger.error(`Error fetching users: ${err}`);
      res.sendStatus(500);
      return;
    }
    res.json(users);
  });
});

// Start the server
app.listen(3000, () => {
  logger.info("Server started on port 3000");
});
