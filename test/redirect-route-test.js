'use strict';

const expect = require('chai').expect;
const request = require('request');

const HttpStatus = require('http-status-codes')

const config = require('../config');

describe('Redirect route', () => {
    it('redirection completed', (done) => {
        request.get(`http://${config.base_url}/1`, (err, res, body) => {
            expect(res.statusCode).to.equal(HttpStatus.OK);
            done();
        });
    });
});