# url-shortener
[![Build Status](https://travis-ci.org/zulhilmizainuddin/url-shortener.svg?branch=master)](https://travis-ci.org/zulhilmizainuddin/url-shortener)
[![Code Climate](https://codeclimate.com/github/zulhilmizainuddin/url-shortener/badges/gpa.svg)](https://codeclimate.com/github/zulhilmizainuddin/url-shortener)

URL shortener RESTful service using Node.js and Express.

## Getting Started

Install memcached:

    sudo apt-get install memcached
    
Start memcached if not already started:

    sudo systemctl start memcached

Install latest Node.js LTS.

Get project dependencies:

    npm install
    
Start server:

    npm start
    
or

    pm2 start bin/www --name="url-shortener"
    
Run unit tests:

    npm test
    
## Endpoints

### POST /shorten
Shortens a URL.

Parameters:

    url - A valid URL
    
Example:

    curl -d "url=http://github.com" -X POST http://localhost:7000/shorten
    
Result:

```javascript
{"shortened_url":"http://localhost:7000/1"}
```

### POST /expand
Expands a shortened URL.

Parameters:

    url - A valid shortened URL
    
Example:

    curl -d "url=http://localhost:7000/1" -X POST http://localhost:7000/expand
    
Result:

```javascript
{"expanded_url": "http://github.com"}
```
    
### GET /{key}
Redirects a shortened URL to the original URL.

Parameters:

    key - Key from the shortened URL

Example: 

    curl http://localhost:7000/1
    
Result:

    Found. Redirecting to http://github.com
