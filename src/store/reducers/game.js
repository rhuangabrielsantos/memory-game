import * as GameActions from '../actions/game'

import Rain from '../../assets/rain.png'
import Sun from '../../assets/sun.png'
import Coke from '../../assets/coke.png'
import Fries from '../../assets/fries.png'
import Hamburger from '../../assets/hamburger.png'
import Pizza from '../../assets/pizza.png'
import Sleeping from '../../assets/sleeping.png'
import Smile from '../../assets/smile.png'

const INITIAL_GAME_STATE = {
  status: false,
  cards: [
    {
      id: 1,
      img: Rain,
      isOpen: false,
      matchId: 2,
      alreadyMatched: false,
    },
    {
      id: 2,
      img: Rain,
      isOpen: false,
      matchId: 1,
      alreadyMatched: false,
    },
    {
      id: 3,
      img: Sun,
      isOpen: false,
      matchId: 4,
      alreadyMatched: false,
    },
    {
      id: 4,
      img: Sun,
      isOpen: false,
      matchId: 3,
      alreadyMatched: false,
    },
    {
      id: 5,
      img: Coke,
      isOpen: false,
      matchId: 6,
      alreadyMatched: false,
    },
    {
      id: 6,
      img: Coke,
      isOpen: false,
      matchId: 5,
      alreadyMatched: false,
    },
    {
      id: 7,
      img: Fries,
      isOpen: false,
      matchId: 8,
      alreadyMatched: false,
    },
    {
      id: 8,
      img: Fries,
      isOpen: false,
      matchId: 7,
      alreadyMatched: false,
    },
    {
      id: 9,
      img: Hamburger,
      isOpen: false,
      matchId: 10,
      alreadyMatched: false,
    },
    {
      id: 10,
      img: Hamburger,
      isOpen: false,
      matchId: 9,
      alreadyMatched: false,
    },
    {
      id: 11,
      img: Pizza,
      isOpen: false,
      matchId: 12,
      alreadyMatched: false,
    },
    {
      id: 12,
      img: Pizza,
      isOpen: false,
      matchId: 11,
      alreadyMatched: false,
    },
    {
      id: 13,
      img: Sleeping,
      isOpen: false,
      matchId: 14,
      alreadyMatched: false,
    },
    {
      id: 14,
      img: Sleeping,
      isOpen: false,
      matchId: 13,
      alreadyMatched: false,
    },
    {
      id: 15,
      img: Smile,
      isOpen: false,
      matchId: 16,
      alreadyMatched: false,
    },
    {
      id: 16,
      img: Smile,
      isOpen: false,
      matchId: 15,
      alreadyMatched: false,
    },
  ],
}

export default function game(game = INITIAL_GAME_STATE, action) {
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
      game = GameActions.resetGameOrMatchCards(
        cardsFlipped[0],
        cardsFlipped[1],
        game
      )
    }

    return GameActions.validateEndGame(game)
  }

  return game
}
