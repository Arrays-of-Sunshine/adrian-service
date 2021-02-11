const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8001;
const db = require('../database');
const cors = require('cors');
const compression = require('compression');
const pg = require('pg')
const {Pool, Client} = require('pg')
require('newrelic');


app.use(compression());

app.use(cors({
  origin: 'http://localhost:8000'
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', express.static('public'));
app.use('/bundle', express.static('public/bundle.js'));

app.get('/products/similar/:productId', async (req, res) => {
  let productId = req.params.productId;
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'adrian123',
    database: 'fec',
  })
  console.time('Query time')
  const {rows} = await pool.query(`SELECT * FROM products WHERE category = 1 LIMIT 16`)
  console.timeEnd('Query time')
   res.send(rows)

});

app.get('/products/favorites', (req, res) => {
  db.getFavorites()
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.patch('/products/favorites/add/:id', (req, res) => {
  let id = req.params.id;
  db.addFavorite(id)
    .then(() => {
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });

});

app.patch('/products/favorites/remove/:id', (req, res) => {
  let id = req.params.id;

  db.removeFavorite(id)
    .then(() => {
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });

});


app.listen(port, () => {
  console.log(`listening at ${port}`);
});