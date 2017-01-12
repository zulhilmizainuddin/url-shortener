'use strict';

const expect = require('chai').expect;

const DatabaseQuery = require('../models/database-query');
const IdtoKeyConverter = require('../utils/id-to-key-converter');

describe('Database query', () => {
    let primaryKey;
    const url = 'github.com';

    const databaseQuery = new DatabaseQuery();

    it('insert original url and query original url id', (done) => {
        databaseQuery.insertOriginalUrl(url);
        databaseQuery
            .queryId(url)
            .then((id) => {
                primaryKey = id;

                expect(id).to.match(/[0-9]+/);
                done();
            });
    });

    it('update key and query original url', (done) => {
        const key = IdtoKeyConverter.convertIdToKey(primaryKey);

        databaseQuery.updateKey(primaryKey, key);
        databaseQuery
            .queryOriginalUrl(key)
            .then((originalUrl) => {
                expect(originalUrl).to.equal(url);
                done();
            });
    });
});