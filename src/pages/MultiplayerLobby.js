import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Screen from "../components/Screen";
import User from "../components/User";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export default function MultiplayerLobby() {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useAuth();
  const [players, setPlayers] = useState(undefined);
  const [gameInformation, setGameInformation] = useState({});

  async function handleEnterGame() {
    if (!user) {
      toast.dark("Você precisa fazer login para entrar na partida");
      return;
    }

    if (players.length === 4) {
      toast.dark("O numero máximo de jogadores foi atingido");
      return;
    }

    await database.ref(`games/${id}/players/`).push({
      id: user.id,
      user,
      score: 0,
      myTurn: false,
    });
  }

  async function handleStartGame() {
    if (players.length === 1) {
      toast.dark("Impossível iniciar a partida sozinho");
      return;
    }

    await database.ref(`games/${id}/start`).set(true);
  }

  useEffect(() => {
    const gameRef = database.ref(`games/${id}`);

    gameRef.on("value", game => {
      const gameInformation = game.val() || {};

      if (gameInformation.start) {
        history.push(`/${id}/game`);
      }

      setGameInformation(gameInformation);
    });

    const playersRef = database.ref(`games/${id}/players`);

    playersRef.on("value", players => {
      const databasePlayers = players.val();

      const parsedPlayers = Object.entries(databasePlayers).map(
        ([key, value]) => {
          return {
            id: value.id,
            user: value.user,
            score: value.score,
            myTurn: value.myTurn,
          };
        }
      );

      setPlayers(parsedPlayers);
    });

    return () => {
      gameRef.off("value");
      playersRef.off("value");
    };
  }, [id, history]);

  if (!players) return <Loading />;

  return (
    <Screen>
      <Header />

      <div className="grid grid-cols-2">
        {players.map(player => (
          <User user={player.user} key={player.id} />
        ))}
      </div>

      <div className="flex items-center justify-center mt-10">
        {players.filter(player => {
          return player.id === user?.id;
        }).length !== 1 && (
          <button
            className="w-36 h-14 mr-2 rounded-md bg-dracula text-white font-righteous"
            onClick={handleEnterGame}
          >
            Entrar no Jogo
          </button>
        )}
        {gameInformation.adminId === user?.id && (
          <button
            className="w-36 h-14 rounded-md bg-indigo-700 text-white font-righteous"
            onClick={handleStartGame}
          >
            Começar Jogo
          </button>
        )}
      </div>
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

      <Footer />
    </Screen>
  );
}
