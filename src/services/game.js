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

export async function resetGameOrMatchCards(gameId, userId) {
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

      await updateScore(gameId, userId);
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
    await updateTurn(gameId);
  }
}

export async function validateEndGame(gameId) {
  const gameDatabase = await database.ref(`/games/${gameId}`).get();
  const cards = gameDatabase.val().cards;

  const cardsMatched = cards.filter(card => {
    return card.alreadyMatched === true;
  });

  if (cardsMatched.length === cards.length) {
    await handleScoreRanking(gameId, gameDatabase.val().players);

    await database.ref(`games/${gameId}`).update({ gameWasFinished: true });
    return;
  }

  await database.ref(`games/${gameId}`).update({ gameWasFinished: false });
}

async function updateCards(gameId, cards) {
  await database.ref(`games/${gameId}`).update({ cards });
}

async function updateTurn(gameId) {
  const gameDatabase = await database.ref(`/games/${gameId}`).get();
  const players = Object.values(gameDatabase.val().players);

  let position = undefined;
  const totalPlayers = players.length;

  const newPlayers = players.map((player, index) => {
    if (player.myTurn) {
      position = index;
      return { ...player, myTurn: false };
    }

    if (position + 1 === index) {
      return { ...player, myTurn: true };
    }

    return player;
  });

  if (position + 1 === totalPlayers) {
    const initialPlayers = newPlayers.map((player, index) => {
      if (index === 0) {
        return { ...player, myTurn: true };
      }

      return player;
    });

    await database.ref(`games/${gameId}`).update({ players: initialPlayers });
    return;
  }

  await database.ref(`games/${gameId}`).update({ players: newPlayers });
}

async function updateScore(gameId, userId) {
  const playersDatabase = await database.ref(`/games/${gameId}/players`).get();
  const players = Object.values(playersDatabase.val());

  const newPlayers = players.map(player => {
    if (player.id === userId) {
      return { ...player, score: player.score + 1 };
    }

    return player;
  });

  await database.ref(`/games/${gameId}`).update({ players: newPlayers });
}

async function handleScoreRanking(gameId, players) {
  let highScore = 0;
  let winningUser = {};

  players.map(player => {
    if (player.score > highScore) {
      highScore = player.score;
      winningUser = player;
    }

    return {};
  });

  const totalWinners = players.filter(player => {
    return player.score === highScore;
  }).length;

  if (totalWinners > 1) {
    await database.ref(`/games/${gameId}`).update({
      endMessage: "Empate! É melhor jogarem novamente ;)",
    });
    return;
  }

  const rankingDatabase = await database.ref(`/ranking`).get();

  const ranking = Object.values(rankingDatabase.val() ?? {});
  let exists = false;

  const newRanking = ranking.map(player => {
    if (player.id === winningUser.id) {
      exists = true;
      return { ...player, score: player.score + 1 };
    }

    return player;
  });

  if (!exists) {
    await database.ref(`/ranking`).push({
      id: winningUser.id,
      user: winningUser.user,
      score: 1,
    });

    await database.ref(`/games/${gameId}`).update({
      endMessage: `O Jogador ${winningUser.user.name} ganhou a partida!`,
    });

    return;
  }

  await database.ref(`/ranking`).remove();

  newRanking.forEach(async player => {
    await database.ref(`/ranking`).push({
      id: player.id,
      user: player.user,
      score: player.score,
    });
  });

  await database.ref(`/games/${gameId}`).update({
    endMessage: `${winningUser.user.name} ganhou a partida!`,
  });
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
