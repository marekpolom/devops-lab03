// Do zdefiniowania aplikacji użyjemy Express.js
const express = require('express');
const app = express();

// Nasza aplikacja będzie „konsumowała” dane w formacie JSON
app.use(express.json());

//==================================================================
// Definiujemy REST API – kod poniżej wymaga uzupełnienia
//==================================================================

// Pobieranie danych na temat wszystkich zespołów
app.get('/bands', async (req, res) => {
  let query = await client.query('SELECT * FROM band');

  return res.send(query.rows);
});

// Dodawanie rekordów do bazy
app.post('/bands', async (req, res) => {
  const message = req.body;

  const query = {
    text: `INSERT INTO band(${Object.keys(req.body)}) VALUES($1, $2)`,
    values: Object.values(req.body),
  }

  await client
  .query(query)
  .then(res.send(message))
  .catch(e => res.send(e.stack))

  // return res.send(message);
});

// Pobieranie danych na temat zespołu o danej nazwie
app.get('/bands/:bandName', async (req, res) => {
  let query = await client.query(`SELECT * FROM band WHERE name='${req.params.bandName}'`);
  
  return res.send(query.rows);
});

// Usuwanie rekordu związanego z zespołem
app.delete('/bands/:id', async (req, res) => {
  await client.query(`DELETE FROM band WHERE id=${req.params.id}`);

  return res.send();
});

// Aktualizacja rekordu związanego z zespołem
app.put('/bands/:id', async (req, res) => {
  let id = req.params.id;
  let keys = Object.keys(req.body);

  let query = ['UPDATE band'];
  query.push('SET')

  let set = [];

  keys.forEach((key) => {
    set.push(`${key}='${req.body[key]}'`);
  });

  query.push(set.join(', '));

  query.push(`WHERE id=${id}`);

  await client.query(query.join(' '));

  return res.send();
});

//==================================================================
// Poniższy kod nie powinien już wymagać zmian
//==================================================================

// Przygotowujemy/wczytujemy konfigurację połączenia z PostgreSQL-em
require('dotenv').config();
const dbConnData = {
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD
};
// Łączymy się z bazą i „stawiamy” serwer API
// Do kontaktu z serwerem PostgreSQL wykorzystamy bibliotekę pg

const { Client } = require('pg');
const client = new Client(dbConnData);
console.log('Connection parameters: ');
console.log(dbConnData);
client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Connection error', err.stack));