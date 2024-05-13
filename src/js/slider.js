import Handlebars from 'handlebars'

import cardsData from '../data/cards.yaml'
import cardTemplate from '../templates/card.hbs'

export default function initSlider() {
  const sliderWrapper = document.querySelector('[slider-wrapper]')

  const cardsHTML = Handlebars.compile(cardTemplate)(cardsData)

  const frag = document.createRange().createContextualFragment(cardsHTML)

  // shift cards vertically
  const cards = frag.querySelectorAll('.card')

  cards.forEach((card) => {
    const shift = Math.floor(Math.random() * 60) - 30
    card.style.transform =`translateY(${shift}px)`
    // card.style.setProperty('--shiftY', `${shift}px` )
    const cardClone = card.cloneNode(true)
    frag.append(cardClone)
  });

  sliderWrapper.append(frag)
  sliderWrapper.classList.add('--scroll-hor')
}
