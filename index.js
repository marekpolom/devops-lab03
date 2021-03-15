const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  return res.send({
    get: "get"
  });
});

app.post('/', async (req, res) => {
  return res.send({
    post: "post"
  });
});

app.delete('/', async (req, res) => {
  return res.send({
    delete: "delete"
  });
});

app.put('/', async (req, res) => {
  return res.send({
    put: "put"
  });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});

module.exports = app;