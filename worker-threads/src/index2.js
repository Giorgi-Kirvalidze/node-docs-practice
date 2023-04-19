const { Worker } = require('worker_threads');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up Multer to handle image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Route to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  const worker = new Worker('./worker2.js', {
    workerData: {
      imagePath: req.file.path
    }
  });

  worker.on('message', result => {
    console.log(`Image processing complete. Result: ${result}`);
    res.send(result);
  });

  worker.on('error', err => {
    console.error(err);
    res.status(500).send(err.message);
  });

  worker.on('exit', code => {
    console.log(`Worker stopped with exit code ${code}`);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});