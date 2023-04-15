const express = require("express");
const fs = require("fs");
const app = express();

app.get("/buffer-image", function (req, res) {
  // read binary data from a file asynchronously
  fs.readFile("src/photo.jpeg", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.statusCode = 500;
      res.end();
      return;
    }

    // create buffer from binary data
    const buffer = Buffer.from(data);

    // write binary data to the response
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Length", buffer.length);
    res.end(buffer);
  });
});

app.listen(5000);
