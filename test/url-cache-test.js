'use strict';

const expect = require('chai').expect;

const UrlCache = require('../models/url-cache');

describe('Url cache', () => {
    it('add and retrieve url', (done) => {
        const key = 'zulhilmi';
        const url = 'github.com';

        const urlCache = new UrlCache();
        urlCache.add(key, url);
        urlCache.get(key, (result) => {
            expect(result).to.equal(url);
            done();
        });
    });
});