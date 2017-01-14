'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');

const DatabaseQuery = require('../models/database-query');
const UrlCache = require('../models/url-cache');
const UrlParser = require('../utils/url-parser');

router.get('/:key', (req, res, next) => {

    const key = req.params.key;

    const databaseQuery = new DatabaseQuery();
    databaseQuery
        .queryOriginalUrl(key)
        .then((originalUrl) => {
            databaseQuery.close();

            const urlCache = new UrlCache();
            urlCache.add(key, originalUrl);

            const url = UrlParser.addProtocolToUrl(originalUrl);

            res.redirect(url);
        })
        .catch((err) => {
            databaseQuery.close();

            const url = UrlParser.addProtocolToUrl(`${req.headers.host}/${key}`);

            res.status(HttpStatus.NOT_FOUND).send({
                error_message: `Failed to expand ${url}`
            });
        });
});

module.exports = router;