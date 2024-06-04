const http = require('http');

function createResponse(req, body) {
  let resBody = '<h1>Request Information</h1>';

  resBody += '<p><strong>Method:</strong> ' + req.method + '</p>';
  resBody += '<p><strong>URI:</strong> ' + req.url + '</p>';
  resBody += '<p><strong>HTTP Version:</strong> ' + req.httpVersion + '</p>';
  resBody += '<h2>Headers:</h2>';
  resBody += '<ul>';
  for (let header in req.headers) {
    resBody += '<li><strong>' + header + ':</strong> ' + req.headers[header] + '</li>';
  }
  resBody += '</ul>';
  resBody += '<h2>Request Body:</h2>';
  resBody += '<p>' + body + '</p>';

  return resBody;
}

const server = http.createServer((req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    const responsePage = createResponse(req, body);
    res.end(responsePage);
  });
});

const PORT = 3333;
server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}/`);
});
