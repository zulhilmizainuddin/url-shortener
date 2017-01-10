'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');

router.post('/', (req, res, next) => {

    const url = req.body.url;
    const regex = /http:\/\/localhost:3000\/[a-zA-Z0-9]{1,10}/;

    if (!url.match(regex)) {
        res.status(HttpStatus.BAD_REQUEST).send({
            error_message: `${url} is not a supported URL`
        });

        return;
    }

    next();
});

module.exports = router;