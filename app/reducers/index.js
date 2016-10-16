'use strict';

var { combineReducers } = require('redux');
import {selectedSubReddit, postsBySubReddit} from './redditReducer';

module.exports = combineReducers({
  config: require('./config'),
  selectedSubReddit,
  postsBySubReddit
});
