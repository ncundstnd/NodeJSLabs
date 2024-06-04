const http = require('http');
const url = require('url');

function calculateSquare(number) {
  return new Promise((resolve, reject) => {
    if (isNaN(number)) {
      reject(new Error('Input is not a number'));
    } else {
      resolve(number * number);
    }
  });
}

function calculateCube(number) {
  return new Promise((resolve, reject) => {
    if (isNaN(number)) {
      reject(new Error('Input is not a number'));
    } else {
      resolve(number * number * number);
    }
  });
}

function calculateFourthPower(number) {
  return new Promise((resolve, reject) => {
    if (isNaN(number)) {
      reject(new Error('Input is not a number'));
    } else {
      resolve(number * number * number * number);
    }
  });
}


const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const queryData = parsedUrl.query.data;

  if (pathname === '/calculate/all') {
    const inputNumber = parseFloat(queryData);

    Promise.all
      ([
        calculateSquare(inputNumber),
        calculateCube(inputNumber),
        calculateFourthPower(inputNumber)
      ])
      .then(results => {
        const [squareResult, cubeResult, fourthPowerResult] = results;
        const output = `Square of ${inputNumber} is: ${squareResult}\n` +
          `Cube of ${inputNumber} is: ${cubeResult}\n` +
          `Fourth power of ${inputNumber} is: ${fourthPowerResult}`;
        res.end(output);
      })
      .catch(error => {
        res.writeHead(400);
        res.end(error.message);
      });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
