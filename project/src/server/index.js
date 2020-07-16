require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.get('/rovers', async (req, res) => {
  const rover = req.query.rover;
  try {
    await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${process.env.API_KEY}`
    )
      .then(res => res.json())
      .then(data => res.send(data));
  } catch (err) {
    console.log('error:', err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
