import gsap from 'gsap'

import state from '../state'

const chat = document.querySelector('[chat]')
let messages = []
const gsapPool = []

export function getChatMessages() {
    let username = ''

    if (state.userInfo) {
      username = state.userInfo.name || state.userInfo.first_name || ''
    }

    if (username === "null") username = ''
    if (username) username = `, ${username}`

    return [
      `Привет${username}, ты там не мёрзнешь? Подсказать, где купить шапку?`,
      `Следующий автобус будет через 10 минут. Хочешь, построю маршрут на метро?`,
    ]
}

export function initChat() {
  messages = getChatMessages()

  // chat.classList.remove('--fade-out-top')

  gsap.to('[chat]', {
    scrollTrigger: {
      trigger: '[chat]',
      start: 'top+=700 top',
      end: '+=3000',
      onEnter: () => {
        animateChatMessage(0)
      },
      onLeave: () => {
        hideChat()
      },
      onEnterBack: () => {
        unhideChat()
      },
      onLeaveBack: () => {
        destroyChatMessage(0)
      }
    }
  })
}

function typeText(where, source, progress) {
  where.textContent = source.substr(0, source.length * progress)
}


function animateChatMessage(index) {
  const message = messages[index]
  if (!message) return

  // create & append bubble
  const messageTemplate = '<div class="chat__message tooltip" chat-message></div>'
  const frag = document.createRange().createContextualFragment(messageTemplate)
  const bubble = frag.children[0]

  chat.append(frag)

  // translate up one height & fade in
  gsap.fromTo(bubble, { y: 60, opacity: 0 }, { y: 0, opacity: 1 }, 0.3)

  const type = {
    symbol: 0
  }

  gsapPool[index] = gsap.to(type, {
    symbol: message.length,
    snap: 'symbol',
    scrollTrigger: {
      scrub: 0.5,
      start: 'top top',
      end: '+=900',
      trigger: '[chat]',
      onEnterBack: () => {
        destroyChatMessage(index + 1)
      },
      onLeave: () => {
        if (messages[index + 1]) {
          animateChatMessage(index + 1)
        }
      },
      onLeaveBack: (self) => {
        if (index === 0 ) return // let initial gsap kill the first bubble
        self.kill()
        destroyChatMessage(index)
      }
    },
    onUpdate() {
      const {progress} = this.scrollTrigger
      typeText(bubble, message, progress)
    }
  })
}


function destroyChatMessage(index) {
  const bubbles = chat.querySelectorAll('[chat-message]')
  const bubble = bubbles[index]
  if (!bubble) return

  // disappear animation
  gsap.to(bubble, { y: '+=60', opacity: 0 }, 0.3)
    .then(() => {
      bubble.remove()
    })

  // kill previously created gsap instances
  gsapPool[index].kill()

}

function hideChat() {
  gsap.to(chat, {y:'-=120px', opacity: 0}, 1)
}

function unhideChat() {
  gsap.to(chat, {y: 0, opacity: 1}, 1)
}
