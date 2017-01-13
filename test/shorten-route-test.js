'use strict';

const expect = require('chai').expect;
const request = require('request');

const UrlValidation = require('../utils/url-validation');

const config = require('../config');

describe('Shorten route', () => {
    it('shortened url', (done) => {
        request.post(`http://${config.base_url}/shorten`, {form: {url: 'http://github.com'}}, (err, res, body) => {
            const result = JSON.parse(body);

            const isSupportedUrl = UrlValidation.isSupportedUrl(result.shortened_url);

            expect(isSupportedUrl).to.be.true;
            done();
        });
    }).timeout(5000);
});