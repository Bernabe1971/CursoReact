
const http = require('http');

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    mensaje: 'Hola desde Node',
    hora: new Date().toLocaleTimeString()
  }));
}).listen(3001, () => console.log('API en http://localhost:3001'));
