const http = require('http');
const url = require('url');
const fs = require('fs');

const factorialAsync = (x, callback) => {
  if (!Number.isInteger(x) || x < 0) {
    process.nextTick(() => {
      callback("Неверное значение параметра k!");
    });
  } else if (x === 0 || x === 1) {
    process.nextTick(() => {
      callback(null, 1);
    });
  } else {
    process.nextTick(() => {
      factorialAsync(x - 1, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, x * result);
        }
      });
    });
  }
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
    factorialAsync(parseInt(k), (err, result) => {
      if (err) {
        console.error('Ошибка:', err);
        res.end(JSON.stringify({ error: err }));
      } else {
        res.end(JSON.stringify({ k: parseInt(k), fact: result }));
      }
    });
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