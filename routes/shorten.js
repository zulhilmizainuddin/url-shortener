'use strict';

const express = require('express');
const router = express.Router();

const HttpStatus = require('http-status-codes');
const DatabaseQuery = require('../models/database-query');

router.get('/:id', (req, res, next) => {

    const url = req.params.id;
    const databaseQuery = new DatabaseQuery();
    databaseQuery.insertUrl(url);

    res.status(HttpStatus.OK).send({  });
});

module.exports = router;