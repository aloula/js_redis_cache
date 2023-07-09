// app.js
// ============

// dependências
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./modules/saveConfig');

// variáveis
const frontServerPort = 8000;
const configFile = './cfg/cacheApi.json';

// início
app.use(cors());
app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));

// rotas
const startService = require('./routes/start');
app.use(startService);
const stopService = require('./routes/stop');
app.use(stopService);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
})

// grava configurações e inicializa o serviço de cache
app.post('/', (req, res) => {
	let cache_server_port = req.body.cache_server_port;
	let redis_host = req.body.redis_host;
	let redis_port = req.body.redis_port;
	let expiration_time = req.body.expiration_time;
	config.saveConfig(configFile, cache_server_port, redis_host, redis_port, expiration_time);
	res.redirect('./start');
})


app.listen(frontServerPort, function() {
	console.log('Servidor de cache funcionando na porta', frontServerPort, "...");
})
