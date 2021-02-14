// test.js
// =======

var config = require('./get_config');
var redisServer = config.getConfig()
console.log(redisServer[0])