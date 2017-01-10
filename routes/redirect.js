'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');
const DatabaseQuery = require('../models/database-query');

router.get('/:key', (req, res, next) => {

    const key = req.params.key;

    const databaseQuery = new DatabaseQuery();
    databaseQuery
        .queryOriginalUrl(key)
        .then((originalUrl) => {
            databaseQuery.close();

            res.redirect(originalUrl);
        })
        .catch((err) => {
            databaseQuery.close();
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error_message: err});
        });
});

module.exports = router;