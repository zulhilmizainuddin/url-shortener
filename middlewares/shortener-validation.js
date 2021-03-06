'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');
const UrlValidation = require('../utils/url-validation');

router.post('/', (req, res, next) => {

    const url = req.body.url;
    if (!UrlValidation.isUrl(url)) {
        res.status(HttpStatus.BAD_REQUEST).send({
            error_message: `${url} is not a valid URL`
        });

        return;
    }

    next();
});

module.exports = router;