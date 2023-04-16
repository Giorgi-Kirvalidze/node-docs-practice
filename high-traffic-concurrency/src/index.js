const async = require("async");
const request = require("request");
const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});

const concurrency = 100; // number of concurrent requests to simulate
const numRequests = 1000; // total number of requests to send

async.timesLimit(
  numRequests,
  concurrency,
  (n, next) => {
    // send an HTTP request to your Express application
    request.get(`http://localhost:${port}`, (err, res, body) => {
      if (err) {
        return next(err);
      }
      next();
    });
  },
  (err) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("Finished sending requests");
    }
  }
);
