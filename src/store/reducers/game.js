import * as GameActions from "../actions/game";

const INITIAL_GAME_STATE = {
  endGame: false,
  cards: [],
};

export default function game(game = INITIAL_GAME_STATE, action) {
  if (action.type === "CREATE_GAME") {
    return { ...game, cards: action.cards };
  }

  if (game.cards.length === 0) return game;

  const cardsFlipped = game.cards.filter(card => {
    return card.isOpen === true && card.alreadyMatched === false;
  });

  if (action.type === "CLICK_CARD" && cardsFlipped.length !== 2) {
    const newCards = game.cards.map(card => {
      if (card.id === action.id) {
        return { ...card, isOpen: true };
      }

      return card;
    });

    return { ...game, cards: newCards };
  }

  if (action.type === "VALIDATE_MATCH") {
    if (cardsFlipped.length === 2) {
      game = GameActions.resetGameOrMatchCards(
        cardsFlipped[0],
        cardsFlipped[1],
        game
      );
    }

    return GameActions.validateEndGame(game);
  }

  return game;
}
