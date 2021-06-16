import * as GameActions from '../actions/game'

import Rain from '../../assets/rain.png'
import Sun from '../../assets/sun.png'

const INITIAL_CARDS_STATE = {
  status: false,
  cards: [
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
}

export default function game(game = INITIAL_CARDS_STATE, action) {
  const cardsFlipped = game.cards.filter(card => {
    return card.isOpen === true && card.alreadyMatched === false
  })

  if (action.type === 'CLICK_CARD' && cardsFlipped.length !== 2) {
    const newCards = game.cards.map(card => {
      if (card.id === action.id) {
        return { ...card, isOpen: true }
      }

      return card
    })

    return { ...game, cards: newCards }
  }

  if (action.type === 'VALIDATE_MATCH') {
    if (cardsFlipped.length === 2) {
      game = GameActions.resetGameOrMatchCards(cardsFlipped[0], cardsFlipped[1], game)
    }

    return GameActions.validateEndGame(game)
  }

  return game
}
