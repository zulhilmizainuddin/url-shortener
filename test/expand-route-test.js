'use strict';

const expect = require('chai').expect;
const request = require('request');

const UrlValidation = require('../utils/url-validation');

const config = require('../config');

describe('Expand route', () => {
    it('expanded url', (done) => {
        request.post(`http://${config.base_url}/expand`, {form: {url: `http://${config.base_url}/1`}}, (err, res, body) => {
            const result = JSON.parse(body);

            const isUrl = UrlValidation.isUrl(result.expanded_url);

            expect(isUrl).to.be.true;
            done();
        });
    }).timeout(5000);
});