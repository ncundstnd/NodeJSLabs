const http = require('http');

function secondJob() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Error occurred"));
    }, 3000);
  });
}

async function executeSecondJob() {
  try {
    await secondJob();
  } catch (error) {
    return error.message;
  }
}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plane' });
  if (req.method === 'GET' && req.url === '/promise') {
    secondJob()
      .then(result => res.end(result))
      .catch(error => {
        res.writeHead(500);
        res.end(error.message);
      });
  } else if (req.method === 'GET' && req.url === '/async') {
    const result = await executeSecondJob();
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
