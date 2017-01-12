'use strict';

const expect = require('chai').expect;

const UrlParser = require('../utils/url-parser');

const config = require('../config');

describe('Url parser', () => {
    it('remove http protocol from url', () => {
        const url = 'http://github.com';
        const result = UrlParser.removeProtocolFromUrl(url);

        expect(result).to.equal('github.com');
    });

    it('add http protocol to url', () => {
        const url = 'github.com';
        const result = UrlParser.addProtocolToUrl(url);

        expect(result).to.equal('http://github.com');
    });

    it('extract key from url', () => {
        const url = `http://${config.base_url}/zulhilmi`;
        const result = UrlParser.extractKeyFromUrl(url);

        expect(result).to.equal('zulhilmi');
    });
});