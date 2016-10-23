'use strict';

var { combineReducers } = require('redux');
import {selectedSubReddit, postsBySubReddit} from './RedditReducer';

module.exports = combineReducers({
  config: require('./Config'),
  selectedSubReddit,
  postsBySubReddit
});
