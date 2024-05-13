import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"

import animateSequence from './animate-sequence'
import animateText from './animate-text'
import sequencesDesktop from './sequences-desktop'
import sequencesMobile from './sequences-mobile'
import twoTextAnimations from './two-text-animations'
import localsTextAnimations from './locals-text-animations'
import { initChat } from './chat'

export default function initAnimations() {
  // SCROLLTRIGGER
  gsap.registerPlugin(ScrollTrigger)

  window.stPlugin = ScrollTrigger

  ScrollTrigger.config({
    // default is "resize,visibilitychange,DOMContentLoaded,load" so we can remove "resize" from the list:
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
  });

  window.framesLoaded = 0
  window.scrollTrigger = true

  ScrollTrigger.matchMedia({
    // mobile
    "(max-width: 567px)": function() {
      sequencesMobile.forEach((sequenceParams) => {
        animateSequence(sequenceParams)
      })

      localsTooltips('mobile')
    },

    // "desktop"
    "(min-width: 568px)": function() {
      sequencesDesktop.forEach((sequenceParams) => {
        animateSequence(sequenceParams)
      })

      localsTooltips()
    },
  })

  animateText(twoTextAnimations, '[scene-two-text]', '[scene-two-texts]')
  animateText(localsTextAnimations, '[locals-text]', '[locals-texts]')

  // sequence one CLOUD fade out
  gsap.to('[cloud-canvas]', {
    autoAlpha: 0,
    scrollTrigger: {
      trigger: '.cloud__content',
      scrub: 0.5,
      start: 'top+=6000 top',
      end: '+=1000',
      toggleActions: 'restart none none reverse',
    }
  })

  // support section text
  gsap.to('.support__content', {
    scrollTrigger: {
      trigger: '[scene-four]',
      start: `top+=450 center`,
      end: '+=10000',
      toggleClass: {targets: '.support__content', className: '--fade-in-bottom'},
    }
  })

  // support section fade out
  gsap.to('[support-canvas]', {
    autoAlpha: 0,
    scrollTrigger: {
      scrub: 0.5,
      trigger: '[support-canvas]',
      start: `top+=6000 center`,
      end: '+=100',
    }
  })

  // TODO: uncomment when you're done with responsive
  // reload on resize, otherwise scrolltrigger gets messy
  const windowWidth = window.innerWidth
  window.onresize = () => {
    if (window.innerWidth !== windowWidth) {
      window.location.reload()
    }
  }

  initChat()

  function localsTooltips(mobile = false) {
    const begin = 1200

    const duration = (mobile) ? 400 : 650
    const end = `+=${duration}`

    const selectors = [
      '.locals__tooltip.audio',
      '.locals__tooltip.--two',
      '.locals__tooltip.--three',
      '.locals__tooltip.--four',
    ]

    selectors.forEach((selector, i) => {
      const start = (mobile)
        ? `top+=${begin + duration * i} top`
        : `top+=${begin + 100 * i} top`

      gsap.to(selector, {
        scrollTrigger: {
          start,
          end,
          trigger: '.locals__tooltips',
          toggleClass: {
            targets: [selector],
            className: '--appear',
          },
        }
      })
    })
  }

}  // initAnimation ends
