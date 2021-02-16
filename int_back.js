// int_back.js
// ===========

// dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// get configuration values from 'cfg/config.json'
const config = require('./get_config')
const configValues = config.getConfig([])
const backServerPort = configValues[5]
const consoleOutput = configValues[6]
console.log("Using the following configuration from: 'cfg/config.json'")
console.log("Back Server Port:", backServerPort)
console.log("Console Output:", consoleOutput)

// program starts here
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log("Waiting connections from API front...")
app.post('/', (req, res) => {
	if (consoleOutput === true) {
		console.log("Number received:", req.body.number)
	}

	res.send({
		result: req.body.number * 2
	})
})

app.listen(backServerPort)