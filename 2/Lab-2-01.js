const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  let html = fs.readFileSync('./2-01.html');
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}/`);
});