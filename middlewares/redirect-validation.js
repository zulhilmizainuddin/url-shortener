'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');

router.get('/:key', (req, res, next) => {

    const key = req.params.key;
    const regex = /[a-zA-Z0-9]+/;

    const match = key.match(regex);
    if (match.length !== key.length) {
        res.status(HttpStatus.BAD_REQUEST).send({
            error_message: `${req.headers.host}/${key} is not a supported URL`
        });

        return;
    }

    next();
});

module.exports = router;