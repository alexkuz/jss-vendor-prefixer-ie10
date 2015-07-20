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
    var ss = jss.createStyleSheet({
        a: {animation: 'yyy'}
    }, {named: false})
    var prefixedProp = cssVendor.prefix.css + 'animation'

    equal(ss.toString(), 'a {\n  ' + prefixedProp + ': yyy;\n}')
})

test('@keyframes', function () {
    var ss = jss.createStyleSheet({
        '@keyframes a': {}
    }, {named: false})
    var prefixedKeyframes = '@' + cssVendor.prefix.css + 'keyframes'

    equal(ss.toString(), prefixedKeyframes + ' a {\n}')
})

test('unknown property', function () {
    var ss = jss.createStyleSheet({
        a: {xxx: 'yyy'}
    }, {named: false})
    equal(ss.toString(), 'a {\n  xxx: yyy;\n}')
})

test('prefixed value', function () {
    var ss = jss.createStyleSheet({
        a: {display: 'flex'}
    }, {named: false})
    var supportedValue = cssVendor.supportedValue('display', 'flex')
    equal(ss.toString(), 'a {\n  display: ' + supportedValue + ';\n}', supportedValue)
})
