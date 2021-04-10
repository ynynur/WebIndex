var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        status: 'OK',
        time: Date.now()
    });
});

module.exports = router;