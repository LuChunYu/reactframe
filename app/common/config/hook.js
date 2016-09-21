'use strict';

/**
 * hook config
 * https://thinkjs.org/doc/middleware.html#toc-df6
 */

module.exports = {
  request_begin : ["prepend","force_proxy"],
  resource : think.config('webpack_on') ? ["prepend","webpack"]:["prepend"]
}
