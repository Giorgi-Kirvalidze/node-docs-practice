const express = require("express");
const path = require("path");

const app = express();

// Resolve the absolute path to the public directory
const publicPath = path.resolve(__dirname, "public");

// Serve static files from the public directory
app.use(express.static(publicPath));

// In this example, we're using the path.resolve() function to resolve the absolute path to the public directory relative to the current file (__dirname). We then pass the resolved path to express.static() to serve static files from that directory.

// By using the path module to resolve the absolute path to the public directory, we can ensure that the directory is always resolved to an absolute path and prevent path traversal attacks. Additionally, by using the path module to work with file and directory paths in a cross-platform compatible way, we can ensure that our application works correctly on different operating systems.
