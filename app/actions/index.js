'use strict';

const configActions = require('./Config');
const redditActions = require('./RedditActions');

module.exports = {
  ...configActions,
  ...redditActions
};
