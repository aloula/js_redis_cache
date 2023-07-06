// config_front.js
// ============

// dependências
const express = require('express')
const app = express()
const axios = require('axios');
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./save_config')


// variáveis
const frontServerPort = 8080

// início
app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send(`
   	<html>
   		<head>
			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="stylesheet" type="text/css" href="style.css" /> 
			<title>Serviço de Cache HTTP</title>
		</head>
	<body>
		<form action="/" method="post">
			<div class="form">
			<div class="title">Serviço de Cache HTTP</div>
			<div class="subtitle">Configure o serviço</div>
			<div class="input-container ic1">
     			<input name="cache_port" class="input" type="text" placeholder=" " />
     		<div class="cut"></div>
     			<label for="cache_port" class="placeholder">Porta do Cache</label>
   			</div>
			<div class="input-container ic2">
     			<input name="redis_host" class="input" type="text" placeholder=" " />
     		<div class="cut"></div>
     			<label for="redis_host" class="placeholder">Host Redis</label>
   			</div>
   			<div class="input-container ic2">
     			<input name="redis_port" class="input" type="text" placeholder=" " />
     		<div class="cut"></div>
     			<label for="redis_port" class="placeholder">Porta do Redis</label>
   			</div>
   			<div class="input-container ic2">
     			<input name="expiration_time" class="input" type="number" placeholder=" " />
     		<div class="cut"></div>
     			<label for="expiration_time" class="placeholder">Tempo de Expiração (sec.)</label>
   			</div>
			<div class="input-container ic2">
			   <input name="cache_enabled" class="input" type="radio" placeholder=" " />
		   	 <div class="cut"></div>
			   <label for="cache_enabled" class="placeholder">Cache Habilitado</label>
			 </div>
			<div class="input-container ic2">
			   <input name="console_output" class="input" type="radio" placeholder=" " />
		   	<div class="cut"></div>
			   <label for="console_output" class="placeholder">Log no Console</label>
			 </div>
   				<button type="text" class="submit">Inicia Serviço</button>
    		</div>
		</form>
   	</html>
`)
})

app.post('/', (req, res) => {
	let redis_host = req.body.redis_host
	let redis_port = req.body.redis_port
	let expiration_time = req.body.expiration_time
	console.log(redis_host)
	config.saveConfig('./cfg/teste.json', redis_host, redis_port, expiration_time)
})


app.listen(frontServerPort, function() {
	console.log('Servidor de cache funcionando na porta', frontServerPort, "...")
  });

