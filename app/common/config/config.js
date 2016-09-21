'use strict';
/**
 * config
 * @type {Object}
 */
module.exports = {
  //key: value
  webpack_on : process.env.webpack_on,
  resource_on: true,
  resource_reg: /^(dist\/|[^\/]+\.(?!js|html)\w+$)/
};
