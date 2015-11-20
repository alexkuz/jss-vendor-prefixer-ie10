import isIE from './isIE'

const iePropMap = {
  'flex-grow': '-ms-flex-positive',
  'flex-shrink': '-ms-flex-negative',
  'flex-basis': '-ms-flex-preferred-size',
  'align-items': '-ms-flex-align',
  'flex-wrap': '-ms-flex-wrap',
  'order': '-ms-flex-order',
  'justify-content': '-ms-flex-pack',
  'align-self': '-ms-flex-item-align',
  'align-content': '-ms-flex-line-pack'
}

const ieValueMap = {
  'flex': '-ms-flexbox',
  'inline-flex': '-ms-inline-flexbox',
  'flex-start': 'start',
  'flex-end': 'end'
}

/**
 * Add vendor prefix to a property name when needed.
 *
 * @param {Rule} rule
 * @api public
 */
export default function jssVendorPrefixerIE10() {
  return rule => {
    if (!isIE() || rule.type !== 'regular') return

    for (let prop in rule.style) {
      const value = rule.style[prop]
      const changeProp = iePropMap[prop]
      const changeValue = ieValueMap[value]

      if (changeValue) {
        rule.style[prop] = value
      }

      if (changeProp) {
        rule.style[changeProp] = rule.style[prop]
        delete rule.style[prop]
      }
    }
  }
}
