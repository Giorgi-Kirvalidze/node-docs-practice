const cluster = require('cluster');
const os = require('os');
const express = require('express');
const axios = require('axios');

const app = express();

if (cluster.isMaster) {
  // Spawn worker processes
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Handle requests
  app.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });

  app.listen(3000, () => {
    console.log(`Worker ${cluster.worker.id} listening on port 3000`);
  });
}
