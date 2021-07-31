import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import Ranking from "../components/Ranking";
import Screen from "../components/Screen";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { createShuffledCards } from "../store/reducers/game";

export default function Dashboard() {
  const history = useHistory();
  const { user } = useAuth();
  const [gameCode, setGameCode] = useState("");

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

  async function handleJoinGame(event) {
    event.preventDefault();

    const gameRef = await database.ref(`games/${gameCode}`).get();

    if (gameCode.trim() === "") {
      toast.dark("Por favor, insira o código do jogo");
      return;
    }

    if (!gameRef.exists()) {
      toast.dark("Jogo não existe");
      return;
    }

    history.push(`${gameCode}/lobby`);
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Screen>
  );
}
