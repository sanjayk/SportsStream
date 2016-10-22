'use strict';
import { DEFAULT_SUBREDDIT } from '../components/Main';
import { combineReducers } from 'redux';
import * as ActionTypes from '../actions/Types';

function selectedSubReddit(state = DEFAULT_SUBREDDIT, action) {
  switch (action.type) {
    case ActionTypes.SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

function posts(state = {
  isFetching: false,
  didRefresh: false,
  items: [],
  after: ""
}, action) {
  switch (action.type) {
    case ActionTypes.REFRESH_SUBREDDIT:
      return Object.assign({}, state, {
        didRefresh: true
      });
    case ActionTypes.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didRefresh: false,
      });
    case ActionTypes.RECEIVE_POSTS:
      //console.log(state.items);
      return Object.assign({}, state, {
        didRefresh: true,
        isFetching: false,
        items: state.items.concat(action.posts),
        after: action.after
      });
    default:
      return state;
  }
}

function postsBySubReddit(state = {}, action) {
  switch (action.type) {
    case ActionTypes.REFRESH_SUBREDDIT:
    case ActionTypes.RECEIVE_POSTS:
    case ActionTypes.REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state;
  }
}

export { selectedSubReddit, postsBySubReddit };
