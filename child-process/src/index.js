// index.js
const express = require('express');
const { spawn } = require('child_process');
const { PassThrough } = require('stream');

const app = express();

app.get('/generate-pdf', (req, res) => {
  const child = spawn('node', ['src/pdfGenerator.js']);
  const input = new PassThrough();
  const output = new PassThrough();

  input.pipe(child.stdin);
  child.stdout.pipe(output);

  const userData = {
    name: 'Giorgi Kirvalidze',
    age: 26,
    email: 'giorgikirvalidzee@gmail.com'
  };

  input.write(JSON.stringify(userData));
  input.end();

  res.setHeader('Content-Type', 'application/pdf');
  output.pipe(res);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
