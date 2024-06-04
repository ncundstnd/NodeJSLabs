const DB = require('./db-module-ASYNC');

const db = new DB();

function handleGet(req, res) {
  console.log('GET called');
  db.select()
    .then(data => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    })
    .catch(err => {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
}

function handlePost(req, res) {
  console.log('POST called');
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    db.insert(body)
      .then(data => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      })
      .catch(err => {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      });
  });
}

function handlePut(req, res) {
  console.log('PUT called');
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    db.update(body)
      .then(data => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      })
      .catch(err => {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      });
  });
}

function handleDelete(req, res) {
  console.log('DELETE called');
  const id = req.url.split('/').pop();
  db.delete(id)
    .then(data => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    })
    .catch(err => {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
}

module.exports = { handleGet, handlePost, handlePut, handleDelete };