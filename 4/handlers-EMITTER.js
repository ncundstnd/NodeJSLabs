const DB = require('./db-module-EMITTER');

const db = new DB();

function handleGet(req, res) {
  console.log('GET called');
  db.on('select', (data) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  });

  db.on('error', (err) => {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });

  db.select();
}

function handlePost(req, res) {
  console.log('POST called');
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    db.on('insert', (data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });

    db.on('error', (err) => {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });

    db.insert(body);
  });
}

function handlePut(req, res) {
  console.log('PUT called');
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    db.on('update', (data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });

    db.on('error', (err) => {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });

    db.update(body);
  });
}

function handleDelete(req, res) {
  console.log('DELETE called');
  const id = req.url.split('/').pop();
  db.on('delete', (data) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  });

  db.on('error', (err) => {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });

  db.delete(id);
}

module.exports = { handleGet, handlePost, handlePut, handleDelete };
