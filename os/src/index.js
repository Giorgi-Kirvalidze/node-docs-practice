const express = require('express');
const os = require('os');

const app = express();

app.get('/', (req, res) => {
  const platform = os.platform();
  const arch = os.arch();
  const totalmem = os.totalmem();

  res.send(`Platform: ${platform}, Arch: ${arch}, Total Memory: ${totalmem}`);
});

app.get('/server-stats', (req, res) => {
    const servers = [
      { name: 'Server 1', host: 'https://nodejs.org/docs/latest-v19.x/api/os.html' },
      { name: 'Server 2', host: 'server2.example.com' },
      { name: 'Server 3', host: 'server3.example.com' },
    ];
  
    const stats = servers.map(server => {
      const { name, host } = server;
      const loadavg = os.loadavg();
      const totalmem = os.totalmem();
      const freemem = os.freemem();
      const disk = os.freemem();
      const hostname= os.hostname();
      const type= os.type();
      const platform= os.platform();
      const release= os.release();
      const uptime= os.uptime();
      const  cpus= os.cpus();
      const networkInterfaces= os.networkInterfaces(),
      return { name, host, loadavg, totalmem, freemem, disk };
    });
  
    res.json(stats);
  });
  

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// get detail of server machine it is running on



// this is example when we have several servers we expose stats api for all of them and get data
const axios = require('axios');
const os = require('os');

const servers = [
  { name: 'Server 1', url: 'http://server1.example.com/api/stats' },
  { name: 'Server 2', url: 'http://server2.example.com/api/stats' },
  { name: 'Server 3', url: 'http://server3.example.com/api/stats' },
];

async function collectStats() {
  const stats = [];

  for (const server of servers) {
    try {
      const response = await axios.get(server.url);
      const data = response.data;
      const loadavg = data.loadavg;
      const totalmem = data.totalmem;
      const freemem = data.freemem;
      const disk = data.disk;

      stats.push({
        name: server.name,
        url: server.url,
        loadavg,
        totalmem,
        freemem,
        disk,
      });
    } catch (error) {
      console.error(`Error collecting stats from ${server.name}: ${error.message}`);
    }
  }

  return stats;
}

async function displayStats() {
  const stats = await collectStats();

  console.log('System Stats:');
  console.log('==============');
  for (const stat of stats) {
    console.log(`Server: ${stat.name}`);
    console.log(`URL: ${stat.url}`);
    console.log(`Load Average: ${stat.loadavg}`);
    console.log(`Total Memory: ${stat.totalmem}`);
    console.log(`Free Memory: ${stat.freemem}`);
    console.log(`Free Disk Space: ${stat.disk}`);
    console.log('-----------------------');
  }
}

displayStats();