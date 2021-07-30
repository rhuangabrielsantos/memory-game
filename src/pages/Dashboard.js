import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Ranking from "../components/Ranking";
import Screen from "../components/Screen";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { createShuffledCards } from "../store/reducers/game";

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useAuth();
  const [gameCode, setGameCode] = useState("");

  async function handleCreateGame() {
    const gameRef = database.ref("games");
    const cards = createShuffledCards();

    const firebaseGame = await gameRef.push({
      authorId: user?.id,
      cards: cards,
      gameWasFinished: false,
    });

    history.push(`/game/${firebaseGame.key}`);
  }

  async function handleJoinGame(event) {
    event.preventDefault();

    const gameRef = await database.ref(`games/${gameCode}`).get();

    if (gameCode.trim() === "") {
      return;
    }

    if (!gameRef.exists()) {
      alert("Game does not exists.");
      return;
    }

    dispatch({ type: "CREATE_GAME", cards: gameRef.val().cards });

    history.push(`/game/${gameCode}`);
  }

  return (
    <Screen>
      <Header />
      <Ranking />

      {user && (
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleCreateGame}
            className="flex items-center justify-center bg-indigo-700 mb-5 md:mb-0 md:mr-5 hover:bg-opacity-75 duration-300 w-80 h-14 font-righteous text-cullen text-xl rounded-xl md:w-80 md:h-20 md:text-2xl"
            disabled={!user}
          >
            <FaPlus className="mr-2" />
            Criar novo jogo
          </button>
          <form onSubmit={handleJoinGame}>
            <div className="flex items-center justify-center md:mt-5">
              <input
                type="text"
                className="w-56 h-14 mr-4 rounded-md text-xl p-3 md:w-80 md:h-20"
                placeholder="Código do jogo"
                onChange={event => setGameCode(event.target.value)}
                value={gameCode}
              />
              <button
                type="submit"
                className="bg-indigo-700 hover:bg-opacity-75 duration-300 w-20 h-14 font-righteous text-cullen text-xl rounded-md md:w-80 md:h-20 md:text-2xl"
              >
                Entrar
              </button>
            </div>
          </form>
          <p className="text-cullen text-sm w-80 text-center mt-4">
            Digite o código para entrar em um jogo existente.
          </p>
        </div>
      )}
    </Screen>
  );
}
