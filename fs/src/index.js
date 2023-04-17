const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Route to serve a file
app.get("/file/:filename", (req, res, next) => {
  const filename = req.params.filename;

  // Construct the full path to the file
  const filepath = path.join(__dirname, "files", filename);

  // Check if the file exists
  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file doesn't exist, send a 404 error
      res.sendStatus(404);
    } else {
      // If the file exists, stream it to the response
      const fileStream = fs.createReadStream(filepath);
      fileStream.pipe(res);
    }
  });
});

app.delete("/file/:filename", (req, res, next) => {
  const filename = req.params.filename;

  // Construct the full path to the file
  const filepath = path.join(__dirname, "files", filename);

  // Delete the file
  fs.unlink(filepath, (err) => {
    if (err) {
      // If there was an error deleting the file, send a 500 error
      res.sendStatus(500);
    } else {
      // If the file was deleted successfully, send a success response
      res.sendStatus(200);
    }
  });
});

function configLoader(req, res, next) {
  fs.readFile("config.json", (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    const config = JSON.parse(data);
    req.config = config;
    next();
  });
}

// app.use(configLoader);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
