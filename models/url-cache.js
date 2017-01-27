'use strict';

const Memcached = require('memcached');

const config = require('../config');
const logger = require('../utils/logger');

class UrlCache {
    constructor() {
        this.memcached = new Memcached(config.memcached_server);
    }

    add(key, url) {
        this.memcached.add(key, url, config.cache_lifetime, (err) => {
            if (err) {
                logger.info(err);
            }
        });
    }

    get(key, callback) {
        this.memcached.get(key, (err, url) => {
            if (err) {
                logger.info(err);
            }

            const result = url ? url : null;
            callback(result);
        });
    }

    delete(key) {
        this.memcached.del(key, (err) => {
            if (err) {
                logger.info(err);
            }
        });
    }
}

module.exports = UrlCache;