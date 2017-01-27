'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');
const UrlValidation = require('../utils/url-validation');

router.delete('/:key', (req, res, next) => {

    const key = req.params.key;
    if (!UrlValidation.isValidKey(key)) {
        res.status(HttpStatus.BAD_REQUEST).send({
            error_message: `${key} is not a valid key`
        });

        return;
    }

    next();
});

module.exports = router;