'use strict';

import type { Action } from '../actions/types';

export type Config = {
  appLinkURL: string;
};

const initialState: Config = {
  appLinkURL: 'https://www.fbf8.com/'
};

function config(state: Config = initialState, action: Action): Config {
  if (action.type === 'LOADED_CONFIG') {
    return {
      appLinkURL: action.config.get('appLinkURL') || state.appLinkURL
    };
  }

  return state;
}

module.exports = config;
