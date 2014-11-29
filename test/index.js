'use strict'

QUnit.module('Vendor prefixes plugin', {
    setup: function () {
        jss.use(jssVendorPrefixer)
    },
    teardown: function () {
        jss.plugins.registry = []
    }
})

test('known property', function () {
    var ss = new jss.Stylesheet({
        a: {animation: 'yyy'}
    })
    var prefixedProp = cssVendor.prefix.css + 'animation'

    equal(ss.toString(), 'a {\n  ' + prefixedProp + ': yyy;\n}')
})

test('unknown property', function () {
    var ss = new jss.Stylesheet({
        a: {xxx: 'yyy'}
    })
    equal(ss.toString(), 'a {\n  xxx: yyy;\n}')
})

