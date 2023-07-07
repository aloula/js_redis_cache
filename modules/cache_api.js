// cache_api.js
// ===========

'use strict';

// dependências
const express = require('express');
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();

// variáveis
var app = express();
const cacheEnabled = true;
const consoleOutput = true;

// função exportada
function startCache () {
    // carrega configuração
    const config = require('./get_config')
    const configValues = config.getConfig('./cfg/cache.json')
    const cacheServerPort = configValues[0]
    const redisServer = configValues[1]
    const redisServerPort = configValues[2]
    const cacheExpireTimeSec = configValues[3]
    
    // configura request
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
          // usa o cache
          if (cacheEnabled === true){
            client.set(name, JSON.stringify(genre))
            // a entrada do cache será removida após o tempo de expiração do cache
            client.expire(name, cacheExpireTimeSec)
          }
          res.send(genre);
        })
        .catch(err => {
          res.send('Gênero não encontrado !!!');
        });
    };
    
    // captura resposta
    const getCache = (req, res) => {
      let name = req.query.name;
      // verifica se o cache existe
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
      let output = ("Serviço de Cache:", cacheServerPort, '\n', "Redis Host:", redisServer, "| Porta:", redisServerPort, "| Tempo de Expiração(s):", cacheExpireTimeSec)
      return(output)
    });
  }

module.exports = {
  startCache
}