// front.js
// ========

// import modules
const express = require('express')
const app = express()
const redis = require('redis')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

// get configuration values from
const config = require('./get_config')
const configValues = config.getConfig([])
const redisServer = configValues[0]
const redisServerPort = configValues[1]
const cacheEnabled = configValues[2]
const cacheExpireTimeSec = configValues[3]
const frontServerPort = configValues[4]
const backServerPort = configValues[5]
const consoleOutput = configValues[6]

console.log("Using the following configuration from: 'cfg/config.json'")
console.log("Redis Server:", redisServer, "| Port:", redisServerPort, "| Enabled: ", cacheEnabled, "| Cache Expire Time(s):", cacheExpireTimeSec)
console.log("Front Server Port:", frontServerPort)
console.log("Back Server Port:", backServerPort)
console.log("Console Output:", consoleOutput)

const client = redis.createClient('redis://' + redisServer + ':' + redisServerPort)
const backServer = ('http://localhost:' + backServerPort + '/')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// client-site with the form to submit a number to the server
app.get('/', (req, res) => {
	res.send(`
   <html lang="en">
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <meta http-equiv="X-UA-Compatible" content="ie=edge" />
         <title>Document</title>
      </head>
      <body>
         Type a number (the result will be multiplied by 2):
         <form action="/" method="post">
				 		<br>
            <input type="number" name="number" placeholder="a number" />
            <input type="submit" />
         </form>
      </body>
   </html>
`)
})

// both functions get the original number from the user input, and the res object
// from express, to make a redirect to another URL as params
const getResultFromCache = (number, res) => {
	let CacheTime = Date.now()
	client.get(number, (error, result) => {
		if (result) {
			if (consoleOutput === true) {
				console.log('Cache request took', Date.now() - CacheTime, 'ms')
			}
			// redirect to display the result & source
			res.redirect('/done?result=' + result + '&from=cache')
		} else {
			console.log('error')
		}
	})
}

const getResultFromAPI = (number, res) => {
	let ApiTime = Date.now()
	axios
		.post(backServer, {
			number: number
		})
		.then(response => {
			if (consoleOutput === true) {
				console.log('API Request took', Date.now() - ApiTime, 'ms')
			}
			let result = response.data.result
			// when receiving the result from API, original number from the user input and the result will be stored in the CACHE
			client.set(number, result)
			// the cache entry will be deleted after 60 sec, automatically
			client.expire(number, cacheExpireTimeSec)
			res.redirect('/done?result=' + result + '&from=API')
		})
		.catch(error => {
			console.log(error)
		})
}

app.post('/', (req, res) => {
	let number = req.body.number
	// if the original number and the result are already stored, result will be true
	if (cacheEnabled === true) {
		client.exists(number, (error, result) => {
			if (result) {
				getResultFromCache(number, res)
				// else we will make a request to the API
			} else {
				getResultFromAPI(number, res)
			}
		})
		} else { 
			getResultFromAPI (number, res)
		}
	})


// the final page template, to which our functions redirect to
app.get('/done', (req, res) => {
	res.send(`
   <html>
      <head>
      </head>
      <body>
      The Result is: ${req.query.result}
      <br/>
      So the original value is ${req.query.result / 2}
      <br/>
      And comes from: ${req.query.from}
      </body>
   </html>
   `)
})

app.listen(frontServerPort)