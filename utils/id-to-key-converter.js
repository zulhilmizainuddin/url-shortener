'use strict';

const base62 = require('base62');

class IdToKeyConverter {
    static convertIdToKey(id) {
        return base62.encode(id);
    }

    static convertKeyToId(key) {
        return base62.decode(key);
    }
}

module.exports = IdToKeyConverter;