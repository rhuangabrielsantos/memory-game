import { database } from "./firebase";

export async function rotateCards(gameId, cardId, isOpen) {
  const ref = await database
    .ref(`/games/${gameId}/cards/`)
    .orderByChild("id")
    .equalTo(cardId);

  ref.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      childSnapshot.ref.update({
        isOpen: !isOpen,
      });

      return true;
    });
  });
}

export async function resetGameOrMatchCards(gameId) {
  await sleep(780);

  const gameDatabase = await database.ref(`/games/${gameId}`).get();
  const cards = gameDatabase.val().cards;

  const cardsFlipped = cards.filter(card => {
    return card.isOpen === true && card.alreadyMatched === false;
  });

  if (cardsFlipped.length === 2) {
    const firstCard = cardsFlipped[0];
    const secondCard = cardsFlipped[1];

    if (firstCard.matchId === secondCard.id) {
      const newCards = cards.map(card => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          return { ...card, alreadyMatched: true };
        }

        return card;
      });

      await updateCards(gameId, newCards);
      return;
    }

    const newCards = cards.map(card => {
      if (card.alreadyMatched !== true && card.isOpen === true) {
        return { ...card, isOpen: false };
      }

      return card;
    });

    await updateCards(gameId, newCards);
  }
}

export async function validateEndGame(gameId) {
  const gameDatabase = await database.ref(`/games/${gameId}`).get();
  const cards = gameDatabase.val().cards;

  const cardsMatched = cards.filter(card => {
    return card.alreadyMatched === true;
  });

  if (cardsMatched.length === cards.length) {
    await database.ref(`games/${gameId}`).update({ gameWasFinished: true });
    return;
  }

  await database.ref(`games/${gameId}`).update({ gameWasFinished: false });
}

async function updateCards(gameId, cards) {
  await database.ref(`games/${gameId}`).update({ cards });
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
