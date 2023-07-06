// get_config.js
// =============

module.exports = {

  getConfig: function getConfig (filename) {
    const fs = require('fs');
    let rawdata = fs.readFileSync(filename);
    let config = JSON.parse(rawdata);
    let cacheServerPort = (config.cacheServerPort);
    let redisServer = (config.redisServer); 
    let redisServerPort = (config.redisServerPort);
    let cacheExpireTimeSec = (config.cacheExpireTimeSec);
    let cacheEnabled = (config.cacheEnabled);
    let consoleOutput = (config.consoleOutput);
    return [cacheServerPort, redisServer, redisServerPort, cacheExpireTimeSec, cacheEnabled, consoleOutput];
  }
}

