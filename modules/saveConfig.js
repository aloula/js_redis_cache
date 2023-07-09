// saveConfig.js
// =============


// módulo para salvar configuração do serviço em formato json
module.exports = {
    
    saveConfig: function saveConfig (filename, cache_server_port, redis_host, redis_port, expiration_time) {
        const fs = require("fs");
        const cache_config = {
            cacheServerPort: cache_server_port,
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