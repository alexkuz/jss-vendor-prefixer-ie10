'use strict'

var vendor = require('css-vendor')

/**
 * Add vendor prefix to a property name when needed.
 *
 * @param {Rule} rule
 * @api public
 */
module.exports = function (rule) {
    var style = rule.style

    for (var prop in style) {
        var supportedProp = vendor.supportedProperty(prop)
        if (supportedProp) {
            style[supportedProp] = style[prop]
            delete style[prop]
        }
    }
}
