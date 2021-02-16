// ext_api.js
// ===========

'use strict';

// dependencies 
const express = require('express');
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();
 
var app = express();

// get configuration values from
const config = require('./get_config')
const configValues = config.getConfig([])
const redisServer = configValues[0]
const redisServerPort = configValues[1]
const cacheEnabled = configValues[2]
const cacheExpireTimeSec = configValues[3]
const frontServerPort = configValues[4]
const consoleOutput = configValues[6]

console.log("Using the following configuration from: 'cfg/config.json'")
console.log("Redis Server:", redisServer, "| Port:", redisServerPort, "| Enabled: ", cacheEnabled, "| Cache Expire Time(s):", cacheExpireTimeSec)
console.log("Back Server Port:", frontServerPort)
console.log("Console Output:", consoleOutput)
 
const getBook = (req, res) => {
  let isbn = req.query.isbn;
  let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  return axios.get(url)
    .then(response => {
      let book = response.data.items;
      if (consoleOutput === true){
        console.log(JSON.stringify(book));
      }
      // If 'cacheEnabled = true' in config we define an isbn key for our cache
      if (cacheEnabled === true){
        client.set(isbn, JSON.stringify(book))
			  // The cache entry will be deleted after the 'cacheExpireTimeSec' automatically
			  client.expire(isbn, cacheExpireTimeSec)
      }
      res.send(book);
    })
    .catch(err => {
      res.send('Book not found !!!');
    });
};
 
const getCache = (req, res) => {
  let isbn = req.query.isbn;
  //It verifies if we have cached it previously
  client.get(isbn, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getBook(req, res);
    }
  });
}
 
app.get('/book', getCache);
 
app.listen(frontServerPort, function() {
  console.log('Server listening on', frontServerPort, "port...")
});