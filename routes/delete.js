'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');

const DatabaseQuery = require('../models/database-query');
const UrlParser = require('../utils/url-parser');

const config = require('../config');

router.delete('/:key', (req, res, next) => {

    const key = req.params.key;

    const databaseQuery = new DatabaseQuery();
    databaseQuery
        .deleteShortenedUrl(key)
        .then(() => {
            databaseQuery.close();

            const deletedUrl = UrlParser.addProtocolToUrl(`${config.base_url}/${key}`);

            res.status(HttpStatus.OK).send({deleted_url: deletedUrl});
        })
        .catch((err) => {
            databaseQuery.close();
            res.status(HttpStatus.NOT_FOUND).send({
                error_message: `Failed to delete ${config.base_url}/${key}`
            });
        });
});

module.exports = router;