import vendor from 'css-vendor'

const KEYFRAMES = '@keyframes'
const KEYFRAMES_LENGHT = KEYFRAMES.length

/**
 * Add vendor prefix to a property name when needed.
 *
 * @param {Rule} rule
 * @api public
 */
export default function jssVendorPrefixer(rule) {
  const style = rule.style

  if (rule.isAtRule && rule.selector.substr(0, KEYFRAMES_LENGHT) === KEYFRAMES) {
    rule.selector = '@' + vendor.prefix.css + 'keyframes' + rule.selector.substr(KEYFRAMES_LENGHT)
    return
  }

  for (let prop in style) {
    const value = style[prop]

    let changeProp = false
    const supportedProp = vendor.supportedProperty(prop)
    if (supportedProp && supportedProp !== prop) changeProp = true

    let changeValue = false
    const supportedValue = vendor.supportedValue(supportedProp, value)
    if (supportedValue && supportedValue !== value) changeValue = true

    if (changeProp || changeValue) {
      if (changeProp) delete style[prop]
      style[supportedProp] = supportedValue
    }
  }
}
