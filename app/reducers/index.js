'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  config: require('./config')
});
