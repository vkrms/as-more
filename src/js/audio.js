import gsap from 'gsap'

const audio = document.querySelector('[audio]')
const audioBtn = document.querySelector('[audio-btn]')
const progress = document.querySelector('[audio-progress]')

function setPause(btn) {
  btn.classList.remove('--play')
  btn.classList.add('--pause')
}

function setPlay(btn) {
  btn.classList.remove('--pause')
  btn.classList.add('--play')
}

function resetProgress() {
  gsap.to(progress, {width:0}, 0)

}

function animateProgress(duration) {
  return gsap.fromTo(progress, {width: '0%'}, {width:'100%', duration})
}

export default function initAudio() {

  let animation

  audioBtn.addEventListener('click', () => {
    // pause
    if (audioBtn.pause) {
      if (animation) animation.pause()
      audio.pause()
      setPlay(audioBtn)
      audioBtn.pause = false
      return
    }

    // play
    audio.play()
    animation = (animation) ? animation.play() : animateProgress(audio.duration)
    audioBtn.pause = true
    setPause(audioBtn)
  })


  audio.addEventListener('ended', () => {
    setPlay(audioBtn)
    resetProgress()
    audioBtn.pause = false
    animation = false
  })
}
