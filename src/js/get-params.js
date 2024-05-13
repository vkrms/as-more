import queryString from 'query-string'
import Cookie from 'oatmeal-cookie'

const params = queryString.parse(window.location.search.slice(1))

// set marker cookie
export function setMarkerCookie() {
  if (!params.marker) return

  const expires = new Date()
  expires.setDate(expires.getDate() + 30)

  Cookie.set('marker', params.marker, {
    expires,
    domain: '.aviasales.ru'
  })
}

let staticSwitch
switch (params.static) {
  case 'true':
    staticSwitch = true
    break;
  case 'false':
    staticSwitch = false
    break;
  default:
    staticSwitch = null
}

export const staticParam = staticSwitch
