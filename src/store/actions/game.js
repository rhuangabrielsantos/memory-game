export function resetGameOrMatchCards(firstCard, secondCard, game) {
  if (firstCard.matchId === secondCard.id) {
    const newCards = game.cards.map((card) => {
      if (card.id === firstCard.id || card.id === secondCard.id) {
        return { ...card, alreadyMatched: true }
      }

      return card
    })

    return { ...game, cards: newCards }
  }

  const newCards = game.cards.map((card) => {
    if (card.alreadyMatched !== true && card.isOpen === true) {
      return { ...card, isOpen: false }
    }

    return card
  })

  return { ...game, cards: newCards }
}

export function validateEndGame(game) {
  const cardsMatched = game.cards.filter((card) => {
    return card.alreadyMatched === true
  })

  if (cardsMatched.length === game.cards.length) {
    return { ...game, status: true }
  }

  return game
}
