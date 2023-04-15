const express = require("express");
const fs = require("fs");
const app = express();
const sharp = require("sharp");

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

app.get("/crop-image", (req, res) => {
  fs.readFile("src/photo.jpeg", (err, buffer) => {
    if (err) {
      console.error(err);
      return;
    }

    // Check the size of the input image
    sharp(buffer).metadata((err, metadata) => {
      if (err) {
        console.error(err);
        return;
      }

      // Set the target size to 400x400 if the input image is larger than that size
      const targetWidth = metadata.width > 400 ? 400 : metadata.width;
      const targetHeight = metadata.height > 400 ? 400 : metadata.height;

      // Crop and resize the image using Sharp
      sharp(buffer)
        .resize(targetWidth, targetHeight)
        .toBuffer((err, croppedBuffer) => {
          if (err) {
            console.error(err);
            return;
          }

          // Send the cropped and zoomed-out image data in an HTTP response
          res.setHeader("Content-Type", "image/jpeg");
          res.send(croppedBuffer);
        });
    });
  });
});

app.listen(5000);
