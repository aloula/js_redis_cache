// app.js
// ============

// dependências
const express = require('express')
const app = express()
const router = express.Router();
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./modules/save_config')
const cache = require('./modules/cache_api')

// variáveis
const frontServerPort = 8000

// início
app.use(cors())
app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }))

// rotas
const startService = require('./routes/start');
app.use(startService);
const stopService = require('./routes/stop')
app.use(stopService);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
})

// grava configurações e inicializa o serviço de cache
app.post('/', (req, res) => {
	let redis_host = req.body.redis_host
	let redis_port = req.body.redis_port
	let expiration_time = req.body.expiration_time
	console.log(redis_host)
	config.saveConfig('./cfg/teste.json', redis_host, redis_port, expiration_time)
	res.redirect('./start')
})


app.listen(frontServerPort, function() {
	console.log('Servidor de cache funcionando na porta', frontServerPort, "...")
  });
