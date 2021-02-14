// get_config.js

module.exports = {

  getConfig: function getConfig () {
    const fs = require('fs');
    let rawdata = fs.readFileSync('cfg/config.json');
    let config = JSON.parse(rawdata);
    let redisServer = (config.redisServer); 
    let redisServerPort = (config.redisServerPort);
    let cacheExpireTimeSec = (config.cacheExpireTimeSec);
    let frontServerPort = (config.frontServerPort);
    let backServerPort = (config.backServerPort);
    return [redisServer, redisServerPort, cacheExpireTimeSec, frontServerPort, backServerPort];
  }
}

