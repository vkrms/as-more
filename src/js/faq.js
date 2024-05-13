import Handlebars from 'handlebars'
import SimpleBar from 'simplebar'

import faqData from '../data/faq.yaml'
import faqGroupTemplate from '../templates/faq-group.hbs'
import faqItemTemplate from '../templates/faq-item.hbs'
import faqTabTemplate from '../templates/faq-tab.hbs'

function renderQuestions(key) {
  const faqContainer = document.querySelector('[faq-items]')
  const faq = faqData.faq[key]
  const faqItemHTML = Handlebars.compile(faqItemTemplate)({faq})
  const frag = document.createRange().createContextualFragment(faqItemHTML)
  faqContainer.innerHTML = null
  faqContainer.append(frag)

  const items = faqContainer.querySelectorAll('[faq-item]')

  items.forEach((item) => {
    item.addEventListener('click', () => {
      toggleQuestion(item)
    }, false)
  })

  window.addEventListener('resize', () => {
    const expanded = document.querySelector('[faq-answer].--expanded')
    if (expanded)
      expanded.style.maxHeight = `${expanded.scrollHeight}px`
  })
}

const tabContainer = document.querySelector('[faq-tabs]')

function setActiveTab(tab) {
  const active = tabContainer.querySelector('.--active')
  active.classList.remove('--active')
  tab.classList.add('--active')
}


function renderTabs() {
  const faqTabHTML = Handlebars.compile(faqTabTemplate)(faqData)
  const frag = document.createRange().createContextualFragment(faqTabHTML)
  tabContainer.append(frag)

  const tabs = tabContainer.querySelectorAll('[faq-tab]')
  tabs[0].classList.add('--active')

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setActiveTab(tab)

      const tabKey = tab.getAttribute('faq-tab')
      renderQuestions(tabKey)
    })
  })
}

function toggleQuestion(item) {
  // close previously opened
  const expanded = document.querySelector('[faq-item].--expanded')
  if (expanded && expanded !== item) {
    expanded.classList.remove('--expanded')
    const openAnswer = expanded.querySelector('[faq-answer]')
    openAnswer.style.maxHeight = null
  }

  // toggle question
  const answer = item.querySelector('[faq-answer]')
  if (answer) {
    item.classList.toggle('--expanded')
    answer.style.maxHeight = (!answer.style.maxHeight) ? `${answer.scrollHeight}px` : null
  }
}


export default function initFaq() {
  const modal = document.querySelector('[faq-modal]')

  function openFaqModal(key) {
    modal.classList.add('--visible')
    renderQuestions(key)
    document.body.classList.add('no-scroll')
    const tab = tabContainer.querySelector(`[faq-tab="${key}"]`)
    setActiveTab(tab)
  }

  function closeFaqModal() {
    modal.classList.remove('--visible')
    document.body.classList.remove('no-scroll')
  }

  // close on fade click
  modal.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeFaqModal()
  })

  // scroll style
  const modalBody = document.querySelector('[faq-body]')
  new SimpleBar(modalBody) /*eslint-disable-line*/

  // close on esc
  document.addEventListener('keydown', e => {
    if (e.keyCode === 27) closeFaqModal()
  })

  // render faq groups
  const faqContainer = document.querySelector('[faq]')
  const faqGroupHTML = Handlebars.compile(faqGroupTemplate)(faqData)
  const frag = document.createRange().createContextualFragment(faqGroupHTML)
  faqContainer.append(frag)

  const groupHandles = faqContainer.querySelectorAll('[faq-group]')
  groupHandles.forEach(handle => {
    handle.addEventListener('click', () => {
      const key = handle.getAttribute('faq-group')
      openFaqModal(key)
    })
  })

  renderTabs()

  const close = document.querySelector('[faq-close]')
  close.addEventListener('click', closeFaqModal)
}
