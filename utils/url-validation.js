'use strict';

const validator = require('validator');

const config = require('../config');

class UrlValidation {
    static isUrl(url) {
        return validator.isURL(url + '');
    }

    static isSupportedUrl(url) {
        const regex = new RegExp(`(?:https?:\/\/)?${config.base_url}\/[a-zA-Z0-9]{1,10}`);
        const match = url.match(regex);

        const isSupported = match !== null ? true : false;

        return isSupported;
    }

    static isValidKey(key) {
        const regex = /[a-zA-Z0-9]{1,10}/;
        const match = key.match(regex);

        const isValid = match[0] === key ? true : false;

        return isValid;
    }
}

module.exports = UrlValidation;