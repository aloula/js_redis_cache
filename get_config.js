// get_config.js
// =============

module.exports = {

  getConfig: function getConfig () {
    const fs = require('fs');
    let rawdata = fs.readFileSync('cfg/config.json');
    let config = JSON.parse(rawdata);
    let redisServer = (config.redisServer); 
    let redisServerPort = (config.redisServerPort);
    let cacheEnabled = (config.cacheEnabled);
    let cacheExpireTimeSec = (config.cacheExpireTimeSec);
    let frontServerPort = (config.frontServerPort);
    let backServerPort = (config.backServerPort);
    let consoleOutput = (config.consoleOutput);
    return [redisServer, redisServerPort, cacheEnabled, cacheExpireTimeSec, frontServerPort, backServerPort, consoleOutput];
  }
}

