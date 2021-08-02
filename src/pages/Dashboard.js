import React from "react";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import Screen from "../components/Screen";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { createShuffledCards } from "../store/reducers/game";

export default function Dashboard() {
  const history = useHistory();
  const { user } = useAuth();

  async function handleCreateGame() {
    const gameRef = database.ref("games");
    const cards = createShuffledCards();

    const firebaseGame = await gameRef.push({
      adminId: user.id,
      cards: cards,
      gameWasFinished: false,
      start: false,
      players: [],
    });

    await database.ref(`games/${firebaseGame.key}/players`).push({
      id: user.id,
      user,
      score: 0,
      myTurn: true,
    });

    history.push(`${firebaseGame.key}/lobby`);
  }

  return (
    <Screen>
      <Header />

      {user && (
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleCreateGame}
            className="flex items-center justify-center bg-indigo-700 mb-2 hover:bg-opacity-75 duration-300 w-64 h-14 font-righteous text-cullen text-xl rounded-md"
            disabled={!user}
          >
            <FaPlus className="mr-2" />
            Criar novo jogo
          </button>
        </div>
      )}
    </Screen>
  );
}
