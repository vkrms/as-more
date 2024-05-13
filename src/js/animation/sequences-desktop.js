import { toggleGlow } from './utils'

const sequences = [

  { // CLOUD
    scene: '[scene-one]',
    frameCount: 67,
    sequenceId: '00',
    start: `top top`,
    end: `+=1900`,
    canvasSize: [1000, 563],
  },

  { // CAR, COIN, FERRIS WHEEL
    scene: '[scene-two]',
    frameCount: 229,
    sequenceId: '01',
    start: `top top`,
    end: `+=8000`,
    canvasSize: [1000, 563]
  },

  { // PCR
    scene: '[scene-three]',
    frameCount: 100,
    sequenceId: '02',
    start: `top+=30% 40%`,
    end: '+=5500',
    markers: false,
    canvasSize: [1000, 1000],
    toggleClass: {targets: '.pcr__content', className: "--fade-in-bottom"},
  },

  { // DASHA MASCOT pre loop
    scene: '[scene-four]',
    frameCount: 30,
    sequenceId: '03',
    start: `top+=250 center`,
    end: '+=800',
    canvasSize: [1000, 1000],
  },

  { // DASHA MASCOT THE LOOP
    scene: '[scene-four]',
    frameCount: 80,
    firstFrame: 30,
    sequenceId: '03',
    start: `top+=1700 center`,
    end: '+=3000',
    canvasSize: [1000, 1000],
    loop: [30, 80],
  },

  { // DASHA MASCOT after loop
    scene: '[scene-four]',
    frameCount: 56,
    firstFrame: 80,
    sequenceId: '03',
    start: `top+=4700 center`,
    end: '+=1700',
    canvasSize: [1000, 1000],
  },

  { // CITY one
    scene: '[scene-five]',
    frameCount: 53,
    sequenceId: '04',
    start: `top+=30% top`,
    end: '+=1600',
    canvasSize: [1000, 1000],
  },

  { // CITY two
    scene: '[scene-five]',
    frameCount: 37,
    firstFrame: 53,
    sequenceId: '04',
    start: `top+=3000 top`,
    end: '+=1100',
    canvasSize: [1000, 1000],
    onLeave: toggleGlow,
    onEnterBack: toggleGlow,
  }
]

export default sequences
