import { hideSplash } from './splash'
import { getTexts } from './animation/utils'
import { getChatMessages } from './animation/chat'
import state from './state'

function renderSectionTwoFallback() {
  const texts = getTexts('[scene-two-texts]')

  texts.forEach((node, i) => {
    const fallback = document.querySelector('[scene-two-fallback-text]')
    const rowFrag = document.createRange().createContextualFragment(`<div class="fallback__row"></div>`)
    const row = rowFrag.firstChild
    const className = ['--bell', '--car', '--wheel', null][i]

    row.classList.add(className)
    row.append(node)
    fallback.append(row)
  })
}


function renderLocalsFallback() {
  const texts = getTexts('[locals-texts]')

  // 1st locals text block (over city)
  document.querySelector('[locals-text]').append(texts[0])

  // 2sn locals text block (over wallet)
  document.querySelector('[locals-fallback-text]').append(texts[1])
}


function renderChat() {
    const messageTemplate = '<div class="chat__message tooltip" chat-message></div>'
    const chat = document.querySelector('[chat]')

    const messages = getChatMessages()

    messages.forEach((message) => {
        // create & append bubble
        const frag = document.createRange().createContextualFragment(messageTemplate)
        const bubble = frag.children[0]
        bubble.textContent = message

        chat.append(frag)
    });
}

export default function renderStatic() {
  state.static = true

  document.body.classList.add('static')

  renderSectionTwoFallback()

  renderLocalsFallback()

  renderChat()

  hideSplash('static')
}
