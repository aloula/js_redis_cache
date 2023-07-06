// save_config.js
// =============


// função
module.exports = {
    
    saveConfig: function saveConfig (filename, redis_host, redis_port, expiration_time) {
        const fs = require("fs");
        const cache_config = {
            redisServer: redis_host,
            redisServerPort: redis_port,
            expirationTime: expiration_time,
          };
        const data = JSON.stringify(cache_config);
        console.log(data);
        fs.writeFile(filename, data, (error) => {
            if (error) {
            console.error(error);      
            throw error;
            } 
            console.log(filename, "salva corretamente!");
        });
            }
  }
