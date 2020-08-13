const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../view', 'login.html'))
});

module.exports = router;