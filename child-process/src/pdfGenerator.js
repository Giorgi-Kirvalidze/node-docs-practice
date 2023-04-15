// pdfGenerator.js
const pdfkit = require('pdfkit');

const input = process.stdin;
const output = process.stdout;

const doc = new pdfkit();
doc.pipe(output);

input.on('data', (chunk) => {
  const userData = JSON.parse(chunk.toString());
  // use userData to generate PDF content
  doc.text(`Name: ${userData.name}`);
  doc.text(`Age: ${userData.age}`);
  doc.text(`Email: ${userData.email}`);
  doc.end();
});

output.on('end', () => {
  process.exit();
});
