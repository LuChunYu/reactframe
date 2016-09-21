'use strict';
/**
 * template config
 * @type {Object}
 */
module.exports = {
  type: 'jade',
  content_type: 'text/html',
  file_ext: '.jade',
  file_depr: '_',
  root_path: think.ROOT_PATH + '/view',
  adapter: {
    jade: {}
  }
};
