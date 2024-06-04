const http = require('http');
global.currentState = 'norm';
global.previousState = 'test';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>' + currentState + '</h1>');
});

const stdIn = process.openStdin();
stdIn.addListener('data', (cmd) => {
  let state = cmd.toString().trim();

  if (state == 'stop' || state == 'norm' || state == 'test' || state == 'idle') {
    previousState = currentState;
    currentState = state;
    process.stdout.write(currentState + ' >> ');
  }
  else if (cmd.toString().trim() === 'exit')
    process.exit(0);
  else
    process.stdout.write('Enter one of the commands: norm, stop, test, idle or exit\n' + currentState + ' >> ');
})

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}/`);
  process.stdout.write(currentState + ' >> ');
});