const { parentPort } = require('worker_threads');

// listen for messages from the main thread
parentPort.on('message', (message) => {
  // process the message and send a result back
  const result = message.toUpperCase();
  parentPort.postMessage(result);
});