const net = require('net');

const server = net.createServer((socket) => {
  console.log('client connected');
  socket.on('error', (err) => {
    console.log(`socket error: ${err.message}`);
  });
  
  socket.on('data', (data) => {
    console.log(data.toString());
  });

  socket.on('end', () => {
    console.log('client disconnected');
  });
});

server.listen(8080, () => {
  console.log('server started');
});