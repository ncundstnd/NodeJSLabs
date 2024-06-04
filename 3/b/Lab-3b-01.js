const http = require('http');

function firstJob() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello World");
    }, 2000);
  });
}

async function executeFirstJob() {
  try {
    const result = await firstJob();
    return result;
  } catch (error) {
    console.error(error);
  }
}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plane' });
  if (req.method === 'GET' && req.url === '/promise') {
    firstJob()
      .then(result => res.end(result))
      .catch(error => {
        res.writeHead(500);
        res.end('Ошибка сервера');
      });
  } else if (req.method === 'GET' && req.url === '/async') {
    const result = await executeFirstJob();
    res.end(result);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}/`);
});
