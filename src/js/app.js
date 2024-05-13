import '../scss/app.scss'

import './sprites'
import initSlider from './slider'
import testSpeed from './test-speed'
import initAnimations from './animation/animation'
import { setMarkerCookie, staticParam } from './get-params'
import renderStatic from './render-static'
import initAudio from './audio'
import initAnchors from './anchors'
import initStickyButton from './sticky-button'
import initFaq from './faq'
import {checkIfMobile, checkIfApple } from './utils'
import state from './state'

// disable scroll history
window.history.scrollRestoration = "manual"

async function app() {

  if (checkIfApple()) document.body.classList.add('apple')

  // send loading started event
  state.loadingStarted = new Date
  state.isMobile = checkIfMobile()
  state.platform = (state.isMobile) ? 'mobile_web' : 'web'

  initAnimations()

  initSlider()

  setMarkerCookie()

  initAudio()

  initAnchors()

  initStickyButton()

  initFaq()
}

// run for homepage only
if (window.location.pathname === "/" || window.location.pathname === "/more-premium") {
  app()
}
