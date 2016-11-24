'use strict';

import type { Action } from '../actions/types';

export type Config = {
  appLinkURL: string;
};

const initialState: Config = {
  subRedditURL: 'https://www.reddit.com/r/sports.json'
};

function config(state: Config = initialState, action: Action): Config {
  if (action.type === 'LOADED_CONFIG') {
    return {
      subRedditURL: action.config.get('subRedditURL') || state.subRedditURL
    };
  }
  
  return state;
}

module.exports = config;
