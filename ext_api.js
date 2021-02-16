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
 

// cep is like the zipcode for Brazil
const getBook = (req, res) => {
  let cep = req.query.cep;
  let url = ('https://viacep.com.br/ws/' + cep + '/json/');
  // console.log(url);
  return axios.get(url)
    .then(response => {
      let location = response.data;
      // console.log(location);
      if (consoleOutput === true){
        console.log(JSON.stringify(location));
      }
      // If 'cacheEnabled = true' in config we define a cep key for our cache
      if (cacheEnabled === true){
        client.set(cep, JSON.stringify(location))
			  // The cache entry will be deleted after the 'cacheExpireTimeSec' automatically
			  client.expire(cep, cacheExpireTimeSec)
      }
      res.send(location);
    })
    .catch(err => {
      res.send('CEP not found !!!');
    });
};
 
const getCache = (req, res) => {
  let cep = req.query.cep;
  //It verifies if we have cached it previously
  client.get(cep, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getBook(req, res);
    }
  });
}
 
app.get('/location', getCache);
 
app.listen(frontServerPort, function() {
  console.log('Server listening on', frontServerPort, "port...")
});