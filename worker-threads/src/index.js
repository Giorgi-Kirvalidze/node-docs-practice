const express = require('express');
const { Worker } = require('worker_threads');

const app = express();

app.get('/', (req, res) => {
  // create a new worker thread
  const worker = new Worker('./worker.js');

  // listen for messages from the worker
  worker.on('message', (result) => {
    res.send(`Result: ${result}`);
  });

  // send a message to the worker
  worker.postMessage('Hello, worker!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
