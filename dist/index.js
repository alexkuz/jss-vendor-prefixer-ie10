!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jssVendorPrefixer=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"css-vendor":2}],2:[function(require,module,exports){
'use strict'

/**
 * Vendor prefix string for the current browser.
 *
 * @type {{js: String, css: String}}
 * @api public
 */
exports.prefix = require('./lib/prefix')

/**
 * Test if a property is supported, returns property with vendor
 * prefix if required, otherwise `false`.
 *
 * @param {String} prop
 * @return {String|Boolean}
 * @api public
 */
exports.supportedProperty = require('./lib/supported-property')

},{"./lib/prefix":3,"./lib/supported-property":4}],3:[function(require,module,exports){
'use strict'

var jsCssMap = {
    Webkit: '-webkit-',
    Moz: '-moz-',
    // IE did it wrong again ...
    ms: '-ms-',
    O: '-o-'
}

var style = document.createElement('p').style
var testProp = 'Transform'

for (var js in jsCssMap) {
    if ((js + testProp) in style) {
        exports.js = js
        exports.css = jsCssMap[js]
        break
    }
}

},{}],4:[function(require,module,exports){
'use strict'

var prefix = require('./prefix')

/**
 * We test every property on vendor prefix requirement.
 * Once tested, result is cached. It gives us up to 70% perf boost.
 * http://jsperf.com/element-style-object-access-vs-plain-object
 */
var cache = {}

var p = document.createElement('p')

// Prefill cache with known css properties to reduce amount of
// properties we need to feature test.
// http://davidwalsh.name/vendor-prefix
;(function() {
    var computed = window.getComputedStyle(document.documentElement, '')
    for (var key in computed) {
        cache[computed[key]] = false
    }
}())

// Convert dash separated strings to camel cased.
var camelize = (function () {
    var regExp = /[-\s]+(.)?/g

    function toUpper(match, c) {
        return c ? c.toUpperCase() : ''
    }

    return function(str) {
        return str.replace(regExp, toUpper)
    }
}())

/**
 * Test if a property is supported, returns property with vendor
 * prefix if required, otherwise `false`.
 *
 * @param {String} prop dash separated
 * @return {String|Boolean}
 * @api public
 */
module.exports = function (prop) {
    // We have not tested this prop yet, lets do the test.
    if (cache[prop] == null) {
        var camelized = prefix.js + camelize('-' + prop)
        var dasherized = prefix.css + prop
        // Test if property is supported.
        // Camelization is required because we can't test using
        // css syntax e.g. in ff.
        cache[prop] = camelized in p.style ? dasherized : false
    }

    return cache[prop]
}

},{"./prefix":3}]},{},[1])(1)
});