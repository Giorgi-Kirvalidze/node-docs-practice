// The default value for the maximum number of listeners in EventEmitter is 10.

const EventEmitter = require('events');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Middleware to parse request body
app.use(bodyParser.json());

// Create a global error handler to catch all unhandled errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('An error occurred');
});

// Route to create a new user
app.post('/users', (req, res, next) => {
  const newUser = req.body;
  // TODO: Validate the new user data

  // ... create new user logic ...

  // Emit an event indicating that a new user was created
  eventEmitter.emit('userCreated', newUser);

  res.status(201).json(newUser);
});

// Route to get all users
app.get('/users', (req, res, next) => {
  // ... get all users logic ...

  res.json(allUsers);
});

// Route to get a specific user by ID
app.get('/users/:id', (req, res, next) => {
  // ... get user by ID logic ...

  res.json(foundUser);
});

// Listen for the 'userCreated' event and log it
eventEmitter.on('userCreated', (newUser) => {
  console.log(`New user created: ${JSON.stringify(newUser)}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
