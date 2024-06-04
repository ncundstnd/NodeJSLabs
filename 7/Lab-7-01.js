const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

// Создаем HTTP-сервер
const httpServer = http.createServer((req, res) => {
  if (req.url === '/start' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('HTTP Server is running');
  } else if (req.url === '/chat' && req.method === 'GET') {
    fs.readFile('chat.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
  }
});

// Запускаем HTTP-сервер на порту 3000
const HTTP_PORT = 3000;
httpServer.listen(HTTP_PORT, () => console.log(`HTTP server listening at http://localhost:${HTTP_PORT}`));


// Создаем WebSocket-сервер
const WS_PORT = 4000;
const wsServer = new WebSocket.Server({ port: WS_PORT });

const clients = [];
const history = [];

wsServer.on('connection', (socket) => {
  console.log('WebSocket connected');

  clients.push(socket);

  // Отправляем историю сообщений новому клиенту
  history.forEach(message => {
    const messageString = `${message.name}: ${message.message}`;
    socket.send(messageString);
  });

  socket.on('message', (data) => {
    console.log('Received message:', data);
    const message = JSON.parse(data);

    // Формируем строку с именем пользователя и сообщением
    const messageString = `${message.name}: ${message.message}`;

    // Добавляем сообщение в историю
    history.push({ name: message.name, message: message.message, socket: socket });

    // Отправляем сообщение всем подключенным клиентам
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  });

  socket.on('close', () => {
    console.log('WebSocket disconnected');
    // Удаляем клиента из списка подключенных
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }

    // Получаем имя пользователя, если оно было отправлено
    let disconnectedUser = 'Unknown User';
    for (let i = 0; i < history.length; i++) {
      if (history[i].socket === socket) {
        disconnectedUser = history[i].name;
        break;
      }
    }

    // Отправляем сообщение о выходе пользователя всем остальным участникам чата
    history.push({ name: disconnectedUser, message: "has left the chat", socket: socket });

    const messageString = `${disconnectedUser}: has left the chat`;

    clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  });
});

console.log(`WebSocket server running on port ${WS_PORT}`)
