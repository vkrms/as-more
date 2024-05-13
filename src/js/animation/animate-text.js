import { ScrollTrigger } from "gsap/ScrollTrigger"

import { getTexts } from './utils'
// import { sendSubscribeEvent } from "../analytics"

export function showContent(where, text) {
  where.append(text)
  text.classList.add('--fade-in-bottom')
}

export function hideContent(where, text) {
  text.classList.remove('--fade-in-bottom')
  text.classList.add('--fade-out-top')

  setTimeout(() => {
    where.removeChild(text)
    text.classList.remove('--fade-out-top')
  }, 450)
}

export default function animateText(textAnimations, sceneSelector, textSourceSelector) {
  textAnimations.forEach((animation, i) => {

    const scene = document.querySelector(sceneSelector)

    const texts = getTexts(textSourceSelector)
    const textEl = texts[i].cloneNode(true)

    ScrollTrigger.create({
      trigger: animation.trigger,
      start: animation.start,
      end: animation.end,
      markers: animation.markers,
      onEnter: () => {
        showContent(scene, textEl)
      },
      onEnterBack: () => {
        showContent(scene, textEl)
      },
      onLeave: () => {
        hideContent(scene, textEl)
      },
      onLeaveBack: () => {
        hideContent(scene, textEl)
      },
    })
  })
}
