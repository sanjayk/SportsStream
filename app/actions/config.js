'use strict';

import * as types from './types';

function loadConfig() {
  const config = '';
  return {
    type: 'LOADED_CONFIG',
    config,
  };
}

module.exports = {loadConfig};
