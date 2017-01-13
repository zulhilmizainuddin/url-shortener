'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');

const UrlCache = require('../models/url-cache');
const UrlParser = require('../utils/url-parser');

router.post('/', (req, res, next) => {
    const key = UrlParser.extractKeyFromUrl(req.body.url);

    const urlCache = new UrlCache();
    urlCache.get(key, (originalUrl) => {
        if (originalUrl) {
            const url = UrlParser.addProtocolToUrl(originalUrl);

            res.status(HttpStatus.OK).send({expanded_url: url});
            return;
        }

        next();
    });
});

module.exports = router;