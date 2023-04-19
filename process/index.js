const { spawn } = require('child_process');

const child = spawn('node', ['child.js']);

// Sending a signal to a child process:
setTimeout(() => {
  child.kill('SIGTERM');
}, 5000);

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, exiting...');
  process.exit(0);
});
/*
In this example, we're spawning a child process using the child_process module and then sending a SIGTERM signal to the child process after 5 seconds using child.kill(). We're also listening for the SIGTERM signal on the parent process and exiting the process cleanly when it's received.
These are just a few examples of how the process module can be used in an Express app. There are many more ways that you can use this module to interact with the Node.js process, depending on your specific use case.
*/