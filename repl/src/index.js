const express = require('express');
const repl = require('repl');

const app = express();

// Start the REPL server
const server = repl.start({
  prompt: 'my-app > '
});

// Add a command to the REPL server
server.defineCommand('sayHello', {
  help: 'Say hello to the user',
  action(name) {
    this.bufferedCommand = '';
    console.log(`Hello ${name}!`);
    this.displayPrompt();
  }
});

// Add a middleware that exposes the REPL server to requests
app.use((req, res, next) => {
  req.repl = server;
  next();
});

// Add a route that executes the "sayHello" command
app.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  req.repl.commands.sayHello.action.call(req.repl, name);
  res.send(`Hello ${name}!`);
});

app.listen(3000, () => console.log('Server started on port 3000'));
