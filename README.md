# url-shortener
[![Build Status](https://travis-ci.org/zulhilmizainuddin/url-shortener.svg?branch=master)](https://travis-ci.org/zulhilmizainuddin/url-shortener)
[![Code Climate](https://codeclimate.com/github/zulhilmizainuddin/url-shortener/badges/gpa.svg)](https://codeclimate.com/github/zulhilmizainuddin/url-shortener)

URL shortener RESTful service using Node.js and Express.

## Getting Started

Install latest Node.js LTS.

Get project dependencies:

    npm install
    
Start server:

    npm start
    
Run unit tests:

    npm test
    
## Endpoints

### POST /shorten
Shortens a URL.

Parameters:

    url - A valid URL

### POST /expand
Expands a shortened URL.

Parameters:

    url - A valid shortened URL
    
### GET /{key}
Redirects a shortened URL to the original URL.

Parameters:

    key - Key from the shortened URL
