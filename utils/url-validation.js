'use strict';

const validator = require('validator');

class UrlValidation {
    static isUrl(url) {
        return validator.isURL(url + '');
    }

    static isSupportedUrl(url) {
        const regex = /(?:https?:\/\/)?localhost:3000\/[a-zA-Z0-9]{1,10}/;
        const match = url.match(regex);

        const isSupported = match !== null ? true : false;

        return isSupported;
    }

    static isValidKey(key) {
        const regex = /[a-zA-Z0-9]+/;
        const match = key.match(regex);

        const isValid = match.length === key.length ? true : false;

        return isValid;
    }
}

module.exports = UrlValidation;