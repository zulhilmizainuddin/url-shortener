'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');

const DatabaseQuery = require('../models/database-query');

const config = require('../config');

router.delete('/:key', (req, res, next) => {

    const key = req.params.key;

    const databaseQuery = new DatabaseQuery();
    databaseQuery
        .deleteShortenedUrl(key)
        .then(() => {
            databaseQuery.close();

            res.status(HttpStatus.OK).send({
                deleted_url: `${config.base_url}/${key}`
            });
        })
        .catch((err) => {
            databaseQuery.close();
            res.status(HttpStatus.NOT_FOUND).send({
                error_message: `Failed to delete ${config.base_url}/${key}`
            });
        });
});

module.exports = router;