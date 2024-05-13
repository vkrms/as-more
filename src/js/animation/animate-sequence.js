import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"

import {updateSplash} from '../splash'


// for sequence animation
export default async function animateSequence(options) {
  const scene = document.querySelector(options.scene)
  const canvas = scene.querySelector('canvas')
  const {frameCount} = options
  const {sequenceId} = options
  const context = canvas.getContext("2d")
  const firstFrame = options.firstFrame || 0
  let animateTo = firstFrame + frameCount - 1

  const currentFrame = index => {
    const separator = (sequenceId.indexOf('mob') !== -1) ? '' : '_'
    return `more-premium/images/content/sequence/${sequenceId}/${sequenceId}${separator}${(index).toString().padStart(4, '0')}.webp`
  }

  [canvas.width, canvas.height] = options.canvasSize

  const images = []
  const sequence = {
    frame: firstFrame
  }

  const loop = (options.loop !== undefined)

  function sawToothWave(progress, repeats) {
    const peak = 1 / repeats
    return progress / peak - Math.floor(progress / peak)
  }

  if (loop) {
    // loop sequence
    const [loopStart, loopEnd] = options.loop
    const loopLength = loopEnd - loopStart
    sequence.frame = loopStart
    animateTo = loopEnd

    ScrollTrigger.create({
      scrub: 0.5,
      trigger: options.scene,
      markers: options.markers,
      start: () => options.start,
      end: () => options.end,
      onUpdate: (st) => {
        const loopFrame = Math.floor(sawToothWave(st.progress, 2) * loopLength)
        sequence.frame = loopStart + loopFrame
        render()
      },
      onLeave: options.onLeave,
    })
  } else {
    // normal sequence
    gsap.fromTo(sequence, sequence, {
      frame: animateTo,
      snap: "frame",
      scrollTrigger: {
        scrub: 0.5,
        trigger: options.scene,
        markers: options.markers,
        start: () => options.start,
        end: () => options.end,
        onUpdate: options.onUpdate,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
        toggleClass: options.toggleClass,
      },
      onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
    })
  }

  // preload images
  async function preloadImages() {
    for (let i = 0; i < frameCount; i += 1) {
      const img = new Image()
      img.src = currentFrame(i + firstFrame)
      images[i + firstFrame] = img

      img.onload = () => {
        window.framesLoaded += 1
        updateSplash()
      }
    }
  }

  await preloadImages()
  if (firstFrame === 0) images[0].onload = render

  function render() {
    if (!images[sequence.frame]) return

    window.requestAnimationFrame(() => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(images[sequence.frame], 0, 0)
    })
  }
}
