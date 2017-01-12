'use strict';

const expect = require('chai').expect;

const UrlValidation = require('../utils/url-validation');

const config = require('../config');

describe('Url validation', () => {
    it('is valid url', () => {
        const url = 'http://github.com';
        const result = UrlValidation.isUrl(url);

        expect(result).to.be.true;
    });

    it('is supported url', () => {
        const url = `http://${config.base_url}/zulhilmi`;
        const result = UrlValidation.isSupportedUrl(url);

        expect(result).to.be.true;
    });

    it('is valid key', () => {
        const key = 'zulhilmi';
        const result = UrlValidation.isValidKey(key);

        expect(result).to.be.true;
    });
});