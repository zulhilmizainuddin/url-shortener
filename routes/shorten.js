'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');

const DatabaseQuery = require('../models/database-query');
const IdToKeyConverter = require('../utils/id-to-key-converter');
const UrlParser = require('../utils/url-parser');

const config = require('../config');

router.post('/', (req, res, next) => {

    const url =  UrlParser.removeProtocolFromUrl(req.body.url);

    const databaseQuery = new DatabaseQuery();
    databaseQuery.insertOriginalUrl(url);
    databaseQuery
        .queryId(url)
        .then((id) => {
            const key = IdToKeyConverter.convertIdToKey(id);

            databaseQuery.updateKey(id, key);
            databaseQuery.close();

            let shortenedUrl = UrlParser.addProtocolToUrl(`${config.base_url}/${key}`);
            
            res.status(HttpStatus.OK).send({shortened_url: shortenedUrl});
        })
        .catch((err) => {
            databaseQuery.close();
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                error_message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
            });
        });
});

module.exports = router;