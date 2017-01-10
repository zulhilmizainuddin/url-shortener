'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');
const DatabaseQuery = require('../models/database-query');

router.post('/', (req, res, next) => {

    const url = req.body.url;
    const databaseQuery = new DatabaseQuery();

    const regex = /http:\/\/localhost:3000\/([a-zA-Z0-9]{1,10})/;
    const key = new RegExp(regex, '').exec(url);

    databaseQuery
        .queryOriginalUrl(key[1])
        .then((originalUrl) => {
            databaseQuery.close();

            res.status(HttpStatus.OK).send({expanded_url: `${originalUrl}`});
        })
        .catch((err) => {
            databaseQuery.close();
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error_message: err});
        });
});

module.exports = router;