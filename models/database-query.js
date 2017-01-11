'use strict';

const sqlite3 = require('sqlite3').verbose();

const logger = require('../utils/logger');

class DatabaseQuery {
    constructor() {
        const shortenerDb = `${__dirname}/../databases/shortener.db`;

        this.db = new sqlite3.Database(shortenerDb);
        this.db.serialize(() => {
            this.db.run(
                `CREATE TABLE if not exists url(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                original_url TEXT NOT NULL,
                key VARCHAR(10) DEFAULT '',
                UNIQUE (original_url))`,
                (err) => {
                    if (err) {
                        logger.info(err);
                    }
                });
        });
    }

    insertOriginalUrl(url) {
        this.db.serialize(() => {
            this.db.run('INSERT INTO url VALUES (?, ?, ?)', [null, url, ''], (err) => {
                if (err) {
                    logger.info(err);
                }
            });
        });
    }

    queryId(url) {

        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.get(`SELECT id FROM url WHERE original_url='${url}'`, (err, row) => {
                    if (!err) {
                        resolve(row.id);
                    } else {
                        logger.info(err);

                        reject(err);
                    }
                });
            });
        });
    }

    queryOriginalUrl(key) {

        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.get(`SELECT original_url FROM url WHERE key='${key}'`, (err, row) => {
                    if (!err) {
                        resolve(row.original_url);
                    } else {
                        logger.info(err);

                        reject(err);
                    }
                });
            });
        });
    }

    updateKey(id, key) {
        this.db.serialize(() => {
            this.db.run('UPDATE url SET key=? WHERE id=?', [key, id], (err) => {
                if (err) {
                    logger.info(err);
                }
            });
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                logger.info(err);
            }
        });
    }
}

module.exports = DatabaseQuery;