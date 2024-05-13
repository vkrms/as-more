export function getTexts(selector) {
  const el = document.querySelector(selector)
  if (!el) return false

  const frag = el.content
  const texts = frag.querySelectorAll('[scrolltrigger-text]')

  // preload images
  const logos = frag.querySelectorAll('img')
  logos.forEach(logo => {
    (new Image).src = logo.src
  });

  return texts
}

// locals glow animation
const glow = document.querySelector('.locals__glow')

export function toggleGlow () {
  glow.classList.toggle('--visible')
}
