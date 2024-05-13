export function checkIfMobile() {
  return (window.outerWidth < 1024)
}

export function checkIfApple() {
  const terms = [ 'Mac', 'iPhone' ]

  return terms.some(term => {
    if (navigator.userAgent.includes(term)) return true
    return false
  })
}
