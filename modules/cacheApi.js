// cacheApi.js
// ===========

'use strict';

// dependências
const express = require('express');
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();

// variáveis
var app = express();
const configFile = './cfg/cacheApi.json'
const cacheEnabled = true;
const consoleOutput = false;

// função exportada
function startCache () {
    // carrega configuração
    const config = require('./loadConfig');
    const configValues = config.loadConfig(configFile)
    const cacheServerPort = configValues[0]
    const redisServer = configValues[1]
    const redisServerPort = configValues[2]
    const expirationTime = configValues[3]

    // configura request para API pública Pokémon
    const getPokemonData = (req, res) => {
      let pokemonName = req.query.pokemonName;
      let url = ('https://pokeapi.co/api/v2/pokemon/?pokemonName=' + pokemonName);
      return axios.get(url)
        .then(response => {
          let pokemonData = response.data;
          if (consoleOutput === true){
            console.log(JSON.stringify(pokemonData));
          }
          // usa o cache
          if (cacheEnabled === true){
            client.set(pokemonName, JSON.stringify(pokemonData))
            // a entrada do cache será removida após o tempo de expiração do cache
            client.expire(pokemonName, expirationTime)
          }
          res.send(pokemonData);
        })
        .catch(err => {
          res.send('Pokémon não encontrado !!!');
        });
    };
    
  
    // captura resposta
    const getCache = (req, res) => {
      let pokemonName = req.query.pokemonName;
      // verifica se o cache existe
      client.get(pokemonName, (err, result) => {
        if (result) {
          res.send(result);
        } else {
          getPokemonData(req, res);
        }
      });
    }
    
    
    app.get('/', getCache);
    
    app.listen(cacheServerPort, function() {
      let output = ("Serviço de Cache:", cacheServerPort, '\n', "Redis Host:", redisServer, "| Porta:", redisServerPort, "| Tempo de Expiração(s):", expirationTime)
      return(output)
    });
  }

module.exports = {
  startCache
}