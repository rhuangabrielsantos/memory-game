import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
    });

    dispatch({ type: "CREATE_GAME", cards: cards });

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
    <div className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen">
      <button
        onClick={handleCreateGame}
        className="bg-indigo-700 mb-5 md:mb-0 md:mr-5 hover:bg-opacity-75 duration-300 w-48 h-14 font-righteous text-cullen text-1xl rounded-xl md:w-80 md:h-20 md:text-2xl"
      >
        Criar jogo
      </button>

      <div>
        <form onSubmit={handleJoinGame}>
          <input
            type="text"
            className="w-48 h-14"
            onChange={event => setGameCode(event.target.value)}
            value={gameCode}
          />
          <button
            type="submit"
            className="bg-indigo-700 mb-5 md:mb-0 md:mr-5 hover:bg-opacity-75 duration-300 w-48 h-14 font-righteous text-cullen text-1xl rounded-xl md:w-80 md:h-20 md:text-2xl"
          >
            Entrar jogo existente
          </button>
        </form>
      </div>
    </div>
  );
}
