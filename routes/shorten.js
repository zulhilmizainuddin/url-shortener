'use strict';

const express = require('express');
const router = express.Router();

const IdToKeyConverter = require('../utils/id-to-key-converter');

const HttpStatus = require('http-status-codes');
const DatabaseQuery = require('../models/database-query');

const config = require('../config');

router.post('/', (req, res, next) => {
    
    const url = req.body.url;

    const databaseQuery = new DatabaseQuery();
    databaseQuery.insertOriginalUrl(url);
    databaseQuery
        .queryId(url)
        .then((id) => {
            const key = IdToKeyConverter.convertIdToKey(id);

            databaseQuery.updateKey(id, key);
            databaseQuery.close();
            
            res.status(HttpStatus.OK).send({shortened_url: `${config.baseUrl}/${key}`});
        })
        .catch((err) => {
            databaseQuery.close();
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error_message: err});
        });
});

module.exports = router;