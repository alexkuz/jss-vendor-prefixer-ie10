export default function isIE() {
  return /msie (8|9|10)/i.test(window.navigator.userAgent)
}
