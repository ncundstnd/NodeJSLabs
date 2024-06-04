const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/xmlhttprequest') {
        fs.readFile('2-04.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    } else if (req.method === 'GET' && req.url === '/api/name') {
        res.writeHead(200, { 'Content-Type': 'text/plane' });
        res.end('Kurylchyk Ivan Olegovich');
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}/`);
});