const http = require('http');
const url = require('url');

function calculateSquare(number) {
  return new Promise((resolve, reject) => {
    if (isNaN(number)) {
      reject(new Error('Input is not a number'));
    } else {
      setTimeout(() => {
        resolve(number * number);
      }, 1000);
    }
  });
}

function calculateCube(number) {
  return new Promise((resolve, reject) => {
    if (isNaN(number)) {
      reject(new Error('Input is not a number'));
    } else {
      setTimeout(() => {
        resolve(number * number * number);
      }, 1500);
    }
  });
}

function calculateFourthPower(number) {
  return new Promise((resolve, reject) => {
    if (isNaN(number)) {
      reject(new Error('Input is not a number'));
    } else {
      setTimeout(() => {
        resolve(number * number * number * number);
      }, 2000);
    }
  });
}


const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const queryData = parsedUrl.query.data;
  const inputNumber = parseFloat(queryData);

  if (pathname === '/calculate/race') {
    Promise.race
      ([
        calculateSquare(inputNumber),
        calculateCube(inputNumber),
        calculateFourthPower(inputNumber)
      ])
      .then(result => {
        res.end(`Result of the fastest calculation: ${result}`);
      })
      .catch(error => {
        console.error(error.message);
      });
  } else if (pathname === '/calculate/any') {
    Promise.any
      ([
        calculateSquare(inputNumber),
        calculateCube(inputNumber),
        calculateFourthPower(inputNumber)
      ])
      .then(result => {
        res.end(`Result of the first resolved calculation: ${result}`);
      })
      .catch(errors => {
        console.error(errors);
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
