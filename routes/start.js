// start.js
// =============

// dependências
const express = require('express');
const router = express.Router();
const path = require('path');
const cache = require('../modules/cacheApi');


router.get('/start', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../views', 'start.html'));
    cache.startCache();
})

router.post('/start', (req, res, next) => {
    res.redirect('/stop');
})

module.exports = router