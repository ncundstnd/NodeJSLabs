const http = require('http');
const url = require('url');
const fs = require('fs');
const { handleGet, handlePost, handlePut, handleDelete } = require('./handlers-EMITTER');

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  switch (req.method) {
    case 'GET':
      if (pathname === '/api/db') {
        handleGet(req, res);
      } else if (pathname === '/form') {
        fs.readFile('form.html', (err, data) => {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        });
      }
      else {
        notFound(res);
      }
      break;
    case 'POST':
      if (pathname === '/api/db') {
        handlePost(req, res);
      } else {
        notFound(res);
      }
      break;
    case 'PUT':
      if (pathname.startsWith('/api/db/')) {
        handlePut(req, res);
      } else {
        notFound(res);
      }
      break;
    case 'DELETE':
      if (pathname.startsWith('/api/db/')) {
        handleDelete(req, res);
      } else {
        notFound(res);
      }
      break;
    default:
      notFound(res);
      break;
  }
});

function notFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}/`);
});
