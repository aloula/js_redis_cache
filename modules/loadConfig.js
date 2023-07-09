// loadConfig.js
// =============


// módulo para carregar configuração do serviço em formato json
module.exports = {

  loadConfig: function loadConfig (filename) {
    const fs = require('fs');
    let rawdata = fs.readFileSync(filename);
    let config = JSON.parse(rawdata);
    let cacheServerPort = (config.cacheServerPort);
    let redisServer = (config.redisServer); 
    let redisServerPort = (config.redisServerPort);
    let expirationTime = (config.expirationTime);
    return [cacheServerPort, redisServer, redisServerPort, expirationTime];
  }
}

