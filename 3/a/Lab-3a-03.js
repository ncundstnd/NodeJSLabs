const http = require('http');
const url = require('url');
const fs = require('fs');

const factorial = (x) => {
  if (!Number.isInteger(x) || x < 0)
    return "Неверное значение параметра k!";
  else if (x == 0 || x == 1)
    return 1;
  else
    return x * factorial(x - 1);
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    let html = fs.readFileSync('./Factorial.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  }
  else if (url.parse(req.url).pathname === '/fact' && typeof url.parse(req.url, true).query.k != 'undefined') {
    let k = url.parse(req.url, true).query.k;
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ k: k, fact: factorial(parseInt(k)) }));
  }
  else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}/`);
});