import state from './state'

export default function initAnchors() {
  scrollFromTo('[slider-button]', '[scene-three]')
  scrollFromTo('[pcr-button]', '#support', 800)
  scrollFromTo('[hero-btn]', '[scene-one]', 300)
  // scrollFromTo('[support-btn]', '#locals', 1300)

  // hero buttons
  scrollFromTo('[feature-cashback]', '#cloud')
  scrollFromTo('[feature-support]', '#support', 800)
  scrollFromTo('[feature-locals]', '#locals', 1300)
  scrollFromTo('[subscribe]', '#payment', -150)


  // payment link
  const paymentLink = document.querySelector('[payment-link]')
  paymentLink.onclick = (e) => {
    e.preventDefault()
    window.location.pathname += '/payment'
  }
}

export function scrollFromTo(btnSelector, toSelector, someMore) {
  const buttons = document.querySelectorAll(btnSelector)

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()

      const element = document.querySelector(toSelector)

      // disable scroll offset for static version
      if (someMore && !state.static) {
        const rect = element.getBoundingClientRect()
        window.scrollTo(0, window.scrollY + rect.top + someMore)
        return
      }

      element.scrollIntoView({
        behavior: 'smooth',
        block: (state.static) ? 'start' : 'center'
      })
    })
  })
}
