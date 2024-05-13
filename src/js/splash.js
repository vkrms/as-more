import { ScrollTrigger } from "gsap/ScrollTrigger"
import state from './state'

const spinner = document.querySelector('[spinner]')
// spinner.play()

export function hideSplash(version) {
  const splashScreen = document.querySelector('[splash-screen]')
  splashScreen.classList.add('--hidden')
  document.body.classList.remove('no-scroll')
  splashScreen.hidden = true
  // window.scrollTo(0, 0)
  if (window.scrollTrigger) ScrollTrigger.refresh()
  spinner.pause()
}

function displayProgress(realProgress, callbackProgress) {
  const displayedProgress = Math.floor(realProgress / callbackProgress * 100)
  return displayedProgress
}

export function updateSplash() {
  const splashScreen = document.querySelector('[splash-screen]')
  if (splashScreen.hidden) return
  const realProgress = Math.floor(window.framesLoaded / 638 * 100)

  const percentOnHighSpeed = 75
  const percentOnLowSpeed = 90

  const callbackProgress = (window.speedMbps > 6) ? percentOnHighSpeed : percentOnLowSpeed
  const displayedProgress = displayProgress(realProgress, callbackProgress)

  if (displayedProgress >= 100) {
    hideSplash('animation')
    return
  }

  const percentsEl = splashScreen.querySelector('[splash-percent]')
  const percentStr = `${Math.floor(displayedProgress).toString().padStart(1, '0')  }%`
  percentsEl.innerText = percentStr
}
