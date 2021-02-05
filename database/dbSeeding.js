const mysql = require('mysql');
const Promise = require('bluebird');
const mockData = require('./mockData');
const pg = require('pg')
const {Pool, Client} = require('pg')
var fs = require('fs');
var csvWriter = require('csv-write-stream')
const fastcsv = require('fast-csv')
var writer = csvWriter()
var faker = require('faker');
const connectString = `postgresql://localhost:5432`
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'adrian123',
  database: 'fec',
})



// USER_ID USERNAME
/*
 writer.pipe(fs.createWriteStream('data.csv'))
 for (let i = 0; i < 10000000; i++) {
  writer.write({
    id: i,
    name:faker.name.firstName(),
    description:'desc',
    image: 'https://picsum.photos/200/300',
    category: 1,
    isFavorite: 2,
    price: '1.99',
    cutPrice: '2.99',
    rating: '2',
    reviewCount: 192

  })

 }


// USER_ID USERNAME

writer.end()
*/






 pool.query(`COPY products FROM '/home/adrian/Documents/hackreactor/w9-hr/similar-items/database/data.csv' DELIMITER ',' CSV HEADER`, (err, data) => {
  console.log(err, data)
})


// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST || 'localhost',
//   user: process.env.MYSQL_USER || 'root',
//   password: process.env.MYSQL_PASSWORD || '',
//   database: process.env.MYSQL_DB || 'fec'
// });

// connection.connect(err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('connected to db');
//   }
// });

// const db = Promise.promisifyAll(connection, {multiArgs: true});



// for (let i = 0; i < mockData.categories.length; i++) {
//   let queryString = `INSERT INTO categories (name) VALUES ("${mockData.categories[i].name}")`;
//   db.queryAsync(queryString)
//     .then(result => {
//       console.log(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// let products = mockData.products;
// let promises = [];

// for (let i = 0; i < products.length; i++) {
//   let queryString = `INSERT INTO products (name, description, imageUrl, category, isFavorite, price, cutPrice, rating, reviewCount) VALUES ("${products[i].name}", "${products[i].description}", "${products[i].imageUrl}", ${products[i].category}, ${products[i].isFavorite}, ${products[i].price}, ${products[i].cutPrice}, ${products[i].rating}, ${products[i].reviewCount})`;

//   promises.push(db.queryAsync(queryString)
//     .then(result => {
//       console.log(result);
//     })
//     .catch(err => {
//       console.log(err);
//     }));
// }

// Promise.all(promises)
//   .then(process.exit);
