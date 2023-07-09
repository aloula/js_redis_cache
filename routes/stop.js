const express = require('express')
const router = express.Router()
const path = require('path')
const cache = require('../modules/cacheApi')


router.get('/stop', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../views', 'stop.html'));
    //process.kill(process.pid, 'SIGTERM')
})


module.exports = router