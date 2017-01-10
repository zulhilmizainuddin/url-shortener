'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');
const validator = require('validator');

router.post('/', (req, res, next) => {
    
    const url = req.body.url;
    if (!validator.isURL(url + '')) {
        res.status(HttpStatus.BAD_REQUEST).send({
            error_message: `${url} is not a valid URL`
        });

        return;
    }

    next();
});

module.exports = router;