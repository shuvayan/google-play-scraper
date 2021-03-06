'use strict';

const gplay = require('../index');
const assert = require('chai').assert;
const assertValidUrl = require('./common').assertValidUrl;

function assertValid (review) {
  assert.isString(review.userId);
  assert.isString(review.userName);
  assert.isString(review.date);
  assert.isString(review.title);
  assert.isString(review.text);
  assert.isNumber(review.score);
  assert(review.score > 0);
  assert(review.score <= 5);
  assertValidUrl(review.url);
}

describe('Reviews method', () => {
  it('should retrieve the reviews of an app', () => {
    return gplay.reviews({appId: 'com.dxco.pandavszombies'})
    .then((reviews) => {
      reviews.map(assertValid);
    });
  });

  it('should validate the sort', () => {
    return gplay.reviews({
      appId: 'com.dxco.pandavszombies',
      sort: 'invalid'
    })
    .then(assert.fail)
    .catch((e) => assert.equal(e.message, 'Invalid sort invalid'));
  });

  it('should retrieve the reviews of an app in Japanese', () => {
    return gplay.reviews({appId: 'com.dxco.pandavszombies', lang: 'ja'})
    .then((reviews) => {
      reviews.map(assertValid);
    });
  });
});
