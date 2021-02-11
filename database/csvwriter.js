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


writer.pipe(fs.createWriteStream('data.csv'))
for (let i = 0; i < 1000000; i++) {
 writer.write({
   id: i,
   name:faker.name.firstName(),
   description:'desc',
   image: 'https://picsum.photos/200/300',
   category: Math.floor(Math.random() * 4 + 1),
   isFavorite: Math.floor(Math.random() * 3 + 1),
   price: '1.99',
   cutPrice: '2.99',
   rating: '2',
   reviewCount: 192
 })

}


// USER_ID USERNAME

writer.end()