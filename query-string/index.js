const express = require('express');
const querystring = require('querystring');

const app = express();

// POST route to handle form submission
app.post('/submit', (req, res) => {
  // Parse the request body as a query string
  const data = querystring.parse(req.body);

  // Do something with the parsed data
  console.log(data);

  // Serialize a JavaScript object into a query string
  const queryParams = querystring.stringify({ name: 'John', age: 30 });

  // Redirect to a new URL with the query parameters
  res.redirect(`/success?${queryParams}`);
});

// GET route to handle query parameters
app.get('/success', (req, res) => {
  // Parse the query parameters into a JavaScript object
  const data = querystring.parse(req.query);

  // Do something with the parsed data
  console.log(data);

  // Send a response
  res.send('Success!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
