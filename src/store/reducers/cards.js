import * as GameActions from '../actions/game'

import Rain from '../../assets/rain.png'
import Sun from '../../assets/sun.png'

const INITIAL_CARDS = [
  {
    id: 1,
    img: Rain,
    isOpen: false,
    matchId: 3,
    alreadyMatched: false
  },
  {
    id: 2,
    img: Sun,
    isOpen: false,
    matchId: 4,
    alreadyMatched: false
  },
  {
    id: 3,
    img: Rain,
    isOpen: false,
    matchId: 1,
    alreadyMatched: false
  },
  {
    id: 4,
    img: Sun,
    isOpen: false,
    matchId: 2,
    alreadyMatched: false
  },
]

export default function cards(cards = INITIAL_CARDS, action) {
  const cardsFlipped = cards.filter(card => {
    return card.isOpen === true && card.alreadyMatched === false
  })

  if (action.type === 'CLICK_CARD' && cardsFlipped.length !== 2) {
    return cards.map(card => {
      if (card.id === action.id) {
        return { ...card, isOpen: true }
      }

      return card
    })
  }

  if (action.type === 'VALIDATE_MATCH') {
    if (cardsFlipped.length === 2) {
      return GameActions.resetGameOrMatchCards(cardsFlipped[0], cardsFlipped[1], cards)
    }
  }

  return cards
}
