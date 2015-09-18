'use strict';

exports.__esModule = true;
exports['default'] = jssVendorPrefixer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cssVendor = require('css-vendor');

var _cssVendor2 = _interopRequireDefault(_cssVendor);

var KEYFRAMES = '@keyframes';
var KEYFRAMES_LENGHT = KEYFRAMES.length;

/**
 * Add vendor prefix to a property name when needed.
 *
 * @param {Rule} rule
 * @api public
 */

function jssVendorPrefixer(rule) {
  var style = rule.style;

  if (rule.isAtRule && rule.selector.substr(0, KEYFRAMES_LENGHT) === KEYFRAMES) {
    rule.selector = '@' + _cssVendor2['default'].prefix.css + 'keyframes' + rule.selector.substr(KEYFRAMES_LENGHT);
    return;
  }

  for (var prop in style) {
    var value = style[prop];

    var changeProp = false;
    var supportedProp = _cssVendor2['default'].supportedProperty(prop);
    if (supportedProp && supportedProp !== prop) changeProp = true;

    var changeValue = false;
    var supportedValue = _cssVendor2['default'].supportedValue(supportedProp, value);
    if (supportedValue && supportedValue !== value) changeValue = true;

    if (changeProp || changeValue) {
      if (changeProp) delete style[prop];
      style[supportedProp] = supportedValue;
    }
  }
}

module.exports = exports['default'];