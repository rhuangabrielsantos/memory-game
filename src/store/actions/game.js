export function resetGameOrMatchCards(firstCard, secondCard, cards) {
  if (firstCard.matchId === secondCard.id) {
    return cards.map(card => {
      if(card.id === firstCard.id || card.id === secondCard.id) {
        return { ...card, alreadyMatched: true }
      }

      return card;
    })
  }

  return cards.map(card => {
    if(card.alreadyMatched !== true && card.isOpen === true) {
      return { ...card, isOpen: false }
    }

    return card;
  })
}
