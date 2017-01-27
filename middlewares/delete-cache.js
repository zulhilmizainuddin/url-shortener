'use strict';

const express = require('express');
const router = express.Router();

const UrlCache = require('../models/url-cache');

router.delete('/:key', (req, res, next) => {

    const key = req.params.key;

    const urlCache = new UrlCache();
    urlCache.delete(key);

    next();
});

module.exports = router;