'use strict';

class UrlParser {
    static removeProtocolFromUrl(url) {
        const regex = /(?:https?:\/\/)?(.+)/;
        const result = regex.exec(url);

        return result[1];
    }

    static addProtocolToUrl(url) {
        const result = `http://${url}`;

        return result;
    }

    static extractKeyFromUrl(url) {
        const regex = /(?:https?:\/\/)?.+\/([a-zA-Z0-9]{1,10})/;
        const key = new RegExp(regex, '').exec(url);

        return key[1];
    }
}

module.exports = UrlParser;