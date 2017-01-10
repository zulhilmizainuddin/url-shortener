'use strict';

const express = require('express');
const router = express.Router();

const IdToKeyConverter = require('../utils/id-to-key-converter');

const HttpStatus = require('http-status-codes');
const DatabaseQuery = require('../models/database-query');

router.get('/:id', (req, res, next) => {

    const url = req.params.id;
    const databaseQuery = new DatabaseQuery();

    databaseQuery.insertOriginalUrl(url);
    databaseQuery
        .queryId(url)
        .then((id) => {
            const key = IdToKeyConverter.convertIdToKey(id);

            databaseQuery.updateKey(id, key);
            
            res.status(HttpStatus.OK).send({
                id: id,
                key: key
            });
        })
        .catch((err) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error_message: err });
        });
});

module.exports = router;