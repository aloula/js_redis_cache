// stop.js
// =============

// dependências
const express = require('express');
const router = express.Router();
const path = require('path');
const cache = require('../modules/cacheApi');


function waitTerminate() {
    console.log("Processo Finalizado!!!");
    process.kill(process.pid, 'SIGTERM');
}
  
router.get('/stop', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../views', 'stop.html'));
    setTimeout(waitTerminate, 5000);
})


module.exports = router