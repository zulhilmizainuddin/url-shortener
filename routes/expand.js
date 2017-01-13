'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');

const DatabaseQuery = require('../models/database-query');
const UrlCache = require('../models/url-cache');
const UrlParser = require('../utils/url-parser');

router.post('/', (req, res, next) => {

    const key = UrlParser.extractKeyFromUrl(req.body.url);

    const databaseQuery = new DatabaseQuery();
    databaseQuery
        .queryOriginalUrl(key)
        .then((originalUrl) => {
            databaseQuery.close();

            const urlCache = new UrlCache();
            urlCache.add(key, originalUrl);

            const url = UrlParser.addProtocolToUrl(originalUrl);

            res.status(HttpStatus.OK).send({expanded_url: url});
        })
        .catch((err) => {
            databaseQuery.close();
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                error_message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
            });
        });
});

module.exports = router;