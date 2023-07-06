// save_config.js
// =============


// módulos
const fs = require("fs");

// função
module.exports = {
    saveConfig: function saveConfig (filename, redis_host, redis_port, expiration_time) {
        const cache_config = {
            redisServer: redis_host,
            redisServerPort: redis_port,
            expirationTime: expiration_time,
          };
        const data = JSON.stringify(cache_config);
        fs.writeFile(filename, data, (error) => {
            if (error) {
            console.error(error);      
            throw error;
            } 
            console.log(filename, "salva corretamente!");
        });
            }
  }
