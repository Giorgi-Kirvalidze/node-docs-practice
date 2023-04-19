const express = require('express');
const readline = require('readline');

const app = express();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

app.get('/', (req, res) => {
  rl.question('What is your name? ', (name) => {
    res.send(`Hello, ${name}!`);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


/*
In this example, the chatbot asks the user for their name and favorite color using the rl.question() method, which reads input from the user via the command line. The chatbot then responds to the user based on their input.

Of course, this is a very simple chatbot example. In a real-world scenario, a chatbot would likely be more complex and use external APIs to generate responses based on user input.
*/