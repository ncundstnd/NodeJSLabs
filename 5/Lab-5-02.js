const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
// const send = require('./KIO-module').send;
const kiomod = require('kiomod');

const PORT = 3000;
let user = undefined;
const PASSWORD = 'mich roxk yvlp alyl';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/registration') {
    if (typeof user !== 'object') {
      fs.readFile(__dirname + '/registration.html', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end("Registration completed successfully! Account details sent to email " + user.email);
      user = undefined;
    }
  } else if (req.method === 'POST' && req.url === '/registration') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const postData = querystring.parse(body);
      if (!postData.email || !postData.pass) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
      } else {
        const message =
          `<h2>Поздравляем, Вы успешно зарегистрировались на нашем сайте!</h2>
                    <i>данные вашей учетной записи:</i>
                    <ul>
                        <li>login: ${postData.email}</li>
                        <li>password: ${postData.pass}</li>
                    </ul>
                    <p>Данное письмо не требует ответа.<p>`;
        kiomod.send(postData.email, PASSWORD, message);
        user = postData;
        res.writeHead(302, { 'Location': '/registration' });
        res.end();
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/registration`));
