'use strict';

const sqlite3 = require('sqlite3').verbose();

class DatabaseQuery {
    constructor() {
        const shortenerDb = `${__dirname}/../databases/shortener.db`;

        this.db = new sqlite3.Database(shortenerDb);
        this.db.serialize(() => {
            this.db.run('CREATE TABLE if not exists url (id INTEGER PRIMARY KEY AUTOINCREMENT, original_url TEXT, key INTEGER)');
        });
    }

    insertUrl(url) {
        this.db.serialize(() => {
            this.db.run('INSERT INTO url VALUES (?, ?, ?)', [null, url, -1]);
        });
    }
}

module.exports = DatabaseQuery;