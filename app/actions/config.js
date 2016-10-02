'use strict';


import type { Action } from './types';

async function loadConfig(): Promise<Action> {
  const config = '';
  return {
    type: 'LOADED_CONFIG',
    config,
  };
}

module.exports = {loadConfig};
