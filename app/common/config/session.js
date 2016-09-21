'use strict';

module.exports = {
  name: 'thinkjs',
  type: 'file',
  secret: 'ML49@^I*',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session',
    }
  }
}