'use strict'

function isIE() {
  return /msie (8|9|10)/i.test(window.navigator.userAgent)
}

QUnit.module('Vendor prefixes plugin', {
  setup: function () {
    jss.use(jssVendorPrefixerIE10())
  },
  teardown: function () {
    jss.plugins.registry = []
  }
})

test('prefixed ie property', function () {
  var ss = jss.createStyleSheet({
    a: {'justify-content': 'center'}
  }, {named: false})

  equal(ss.toString(), isIE() ? 'a {\n  -ms-flex-pack: center;\n}' : 'a {\n  justify-content: center;\n}')
})

test('prefixed ie value', function () {
  var ss = jss.createStyleSheet({
    a: {display: 'inline-flex'}
  }, {named: false})
  equal(ss.toString(), isIE() ? 'a {\n  display: -ms-inline-flexbox;\n}' : 'a {\n  display: inline-flex;\n}')
})
