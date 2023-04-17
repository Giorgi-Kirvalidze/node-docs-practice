const Inspector = require('inspector');
const inspector = new Inspector();

// Start the inspector agent
inspector.start();

// Connect to the debugger
inspector.connect();

// Attach to the Node.js process
inspector.attach();

// Set a breakpoint in the code
inspector.pause();

// Resume execution of the code
inspector.resume();
