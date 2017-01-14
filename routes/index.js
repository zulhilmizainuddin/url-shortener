'use strict';

const express = require('express');
const router = express.Router();

const config = require('../config');

const UrlParser = require('../utils/url-parser');

router.get('/', (req, res, next) => {
    const repositoryUrl = UrlParser.addProtocolToUrl(config.repository_url);
    res.redirect(repositoryUrl);
});

module.exports = router;