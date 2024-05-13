import ScrollTrigger from 'gsap/ScrollTrigger'
import gsap from 'gsap'

// show sticky button when not scrolling
export default function initStickyButton() {
  gsap.registerPlugin(ScrollTrigger)

  const stickyControls = document.querySelector('[sticky-controls]')

  // available from cloud to locals sections
  gsap.to(stickyControls, {
    scrollTrigger: {
      trigger: '[scene-one]',
      start: 'top top',
      endTrigger: '.locals',
      end: 'top bottom',
      toggleClass: {targets: stickyControls, className: '--available'},
    }
  })
}
