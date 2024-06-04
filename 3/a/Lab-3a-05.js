const http = require('http');
const url = require('url');
const fs = require('fs');

const factorialAsync = (x, callback) => {
  if (!Number.isInteger(x) || x < 0) {
    setImmediate(() => {
      callback("Неверное значение параметра k!");
    });
  } else if (x === 0 || x === 1) {
    setImmediate(() => {
      callback(null, 1);
    });
  } else {
    let result = 1;
    let i = 2;
    const calculate = () => {
      if (i <= x) {
        result *= i;
        i++;
        setImmediate(calculate);
      } else {
        callback(null, result);
      }
    };
    setImmediate(calculate);
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
        // Обработка ошибки, если она есть
        console.error('Ошибка:', err);
        res.end(JSON.stringify({ error: err }));
      } else {
        // Отправка результата, если нет ошибки
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