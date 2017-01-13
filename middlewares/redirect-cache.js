'use strict';

const express = require('express');
const router = express.Router();

const UrlCache = require('../models/url-cache');
const UrlParser = require('../utils/url-parser');

router.get('/:key', (req, res, next) => {

    const key = req.params.key;

    const urlCache = new UrlCache();
    urlCache.get(key, (originalUrl) => {
        if (originalUrl) {
            const url = UrlParser.addProtocolToUrl(originalUrl);

            res.redirect(url);
            return;
        }

        next();
    });
});

module.exports = router;