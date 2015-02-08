'use strict'

QUnit.module('Vendor prefixes plugin', {
    setup: function () {
        jss.use(jssVendorPrefixer)
    },
    teardown: function () {
        jss.plugins.registry = []
    }
})

test('prefixed property', function () {
    var ss = new jss.StyleSheet({
        a: {animation: 'yyy'}
    }, {named: false})
    var prefixedProp = cssVendor.prefix.css + 'animation'

    equal(ss.toString(), 'a {\n  ' + prefixedProp + ': yyy;\n}')
})

test('unknown property', function () {
    var ss = new jss.StyleSheet({
        a: {xxx: 'yyy'}
    }, {named: false})
    equal(ss.toString(), 'a {\n  xxx: yyy;\n}')
})

test('prefixed value', function () {
    var ss = new jss.StyleSheet({
        a: {display: 'flex'}
    }, {named: false})
    var supportedValue = cssVendor.supportedValue('display', 'flex')
    equal(ss.toString(), 'a {\n  display: ' + supportedValue + ';\n}', supportedValue)
})
