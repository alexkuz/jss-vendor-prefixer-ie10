import * as vendor from 'css-vendor'

/**
 * Add vendor prefix to a property name when needed.
 *
 * @param {Rule} rule
 * @api public
 */
export default function jssVendorPrefixer() {
  return rule => {
    if (rule.type === 'keyframe') {
      rule.selector = `@${vendor.prefix.css}keyframes${rule.selector.substr(10)}`
      return
    }

    if (rule.type !== 'regular') return

    for (let prop in rule.style) {
      const value = rule.style[prop]

      let changeProp = false
      const supportedProp = vendor.supportedProperty(prop)
      if (supportedProp && supportedProp !== prop) changeProp = true

      let changeValue = false
      const supportedValue = vendor.supportedValue(supportedProp, value)
      if (supportedValue && supportedValue !== value) changeValue = true

      if (changeProp || changeValue) {
        if (changeProp) delete rule.style[prop]
        rule.style[supportedProp] = supportedValue
      }
    }
  }
}
