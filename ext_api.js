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
const config = require('./public/get_config')
const configValues = config.getConfig('./cfg/cache.json')
const cacheServerPort = configValues[0]
const redisServer = configValues[1]
const redisServerPort = configValues[2]
const cacheExpireTimeSec = configValues[3]
const cacheEnabled = configValues[4]
const consoleOutput = configValues[5]

console.log("Cache Server Port:", cacheServerPort, "| Habilitado:", cacheEnabled)
console.log("Redis Server:", redisServer, "| Port:", redisServerPort, "| Enabled: ", cacheEnabled, "| Cache Expire Time(s):", cacheExpireTimeSec)
console.log("Console Output:", consoleOutput)
 

// get genre based on name
const getGenre = (req, res) => {
  let name = req.query.name;
  //console.log(name)
  let url = ('https://api.genderize.io/?name=' + name);
  //console.log(url);
  return axios.get(url)
    .then(response => {
      let genre = response.data;
      //console.log(genre);
      if (consoleOutput === true){
        console.log(JSON.stringify(genre));
      }
      // If 'cacheEnabled = true' in config we define a 'name' key for our cache
      if (cacheEnabled === true){
        client.set(name, JSON.stringify(genre))
			  // The cache entry will be deleted after the 'cacheExpireTimeSec' automatically
			  client.expire(name, cacheExpireTimeSec)
      }
      res.send(genre);
    })
    .catch(err => {
      res.send('Genre not found !!!');
    });
};
 
const getCache = (req, res) => {
  let name = req.query.name;
  //It verifies if we have cached it previously
  client.get(name, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getGenre(req, res);
    }
  });
}
 
app.get('/', getCache);
 
app.listen(cacheServerPort, function() {
  console.log('Servidor de cache funcionando na porta', cacheServerPort, "...")
});