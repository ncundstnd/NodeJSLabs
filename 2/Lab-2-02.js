const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/png') {
        fs.readFile('2-02.png', (err, data) => {
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(data);
        });
    }else {
        res.writeHead(404);
        res.end('Not found');
    } 
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}/`);
});