'use strict';

const configActions = require('./config');
const redditActions = require('./redditActions');

module.exports = {
  ...configActions,
  ...redditActions
};
