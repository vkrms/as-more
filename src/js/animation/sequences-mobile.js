import { toggleGlow } from './utils'

const sequences = [

  { // CLOUD
    scene: '[scene-one]',
    frameCount: 67,
    sequenceId: '00_mob',
    start: `top bottom-=25%`,
    end: `+=100%`,
    canvasSize: [375, 250]
  },

  { // CAR, COIN, FERRIS WHEEL
    scene: '[scene-two]',
    frameCount: 229,
    sequenceId: '01_mob',
    start: `top top`,
    end: `+=8800`,
    markers: false,
    canvasSize: [375, 667]
  },

  { // PCR
    scene: '[scene-three]',
    frameCount: 100,
    sequenceId: '02_mob',
    start: `top top`,
    end: '+=5500',
    markers: false,
    canvasSize: [375, 600],
    toggleActions: 'play reverse none reverse',
    toggleClass: {targets: '.pcr__content', className: "--fade-in-bottom"},
  },

  { // DASHA MASCOT pre loop
    scene: '[scene-four]',
    frameCount: 30,
    sequenceId: '03_mob',
    start: `top center`,
    end: '+=800',
    canvasSize: [375, 600],
  },

  { // DASHA MASCOT THE LOOP
    scene: '[scene-four]',
    frameCount: 80,
    firstFrame: 30,
    sequenceId: '03_mob',
    start: `top+=1700 center`,
    end: '+=3000',
    canvasSize: [375, 600],
    loop: [30, 80],
  },

  { // DASHA MASCOT after loop
    scene: '[scene-four]',
    frameCount: 56,
    firstFrame: 80,
    sequenceId: '03_mob',
    start: `top+=4700 center`,
    end: '+=1700',
    canvasSize: [375, 600],
  },

  { // CITY one
    scene: '[scene-five]',
    frameCount: 53,
    sequenceId: '04_mob',
    start: `top top`,
    end: '+=1600',
    canvasSize: [750, 750],
  },

  { // CITY two
    scene: '[scene-five]',
    frameCount: 37,
    firstFrame: 53,
    sequenceId: '04_mob',
    start: `top+=3600 top`,
    end: '+=1100',
    canvasSize: [750, 750],
    onLeave: toggleGlow,
    onEnterBack: toggleGlow,
  }
]

export default sequences
