import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.dark("Você precisa fazer login para jogar");
      return;
    }

    if (players.length === 15) {
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

  function copyToClipboard() {
    navigator.clipboard.writeText(`${process.env.REACT_APP_URL}/${id}/lobby`);
    toast.dark("ID copiado para a área de transferência");
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

  if (!players) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  return (
    <Screen>
      <Header />

      <h1 className="font-righteous text-cullen text-5xl mb-10">Jogadores</h1>
      <div className="grid grid-cols-4 md:flex md:items-center md:justify-center">
        {players.map(player => (
          <User user={player.user} key={player.id} />
        ))}
      </div>

      {players.filter(player => {
        return player.id === user?.id;
      }).length !== 1 && (
        <div className="flex flex-row items-center justify-center mt-10">
          <button
            className="w-36 h-14 rounded-md bg-dracula hover:bg-opacity-75 duration-300 text-white font-righteous"
            onClick={handleEnterGame}
          >
            Entrar no Jogo
          </button>
        </div>
      )}
      {players.filter(player => {
        return player.id === user?.id;
      }).length === 1 &&
        gameInformation.adminId !== user?.id && (
          <div className="flex flex-row items-center justify-center mt-10">
            <p className="text-cullen font-roboto text-sm w-100 text-center mt-4">
              Aguarde o host iniciar a partida!
            </p>
          </div>
        )}
      {gameInformation.adminId === user?.id && (
        <>
          <div className="flex flex-row items-center justify-center mt-10">
            <div
              className="cursor-pointer mr-2 w-14 h-14 flex items-center justify-center border-2 hover:bg-aro duration-300 border-aro rounded-md"
              onClick={copyToClipboard}
              title="Clique aqui para copiar o código da sala"
            >
              <FaRegCopy className="text-gray-200 w-6 h-auto" />
            </div>
            <button
              className="w-36 h-14 rounded-md bg-indigo-700 hover:bg-opacity-75 duration-300 text-white font-righteous mr-2"
              onClick={handleStartGame}
            >
              Começar Jogo
            </button>
          </div>
          <p className="text-cullen font-roboto text-sm w-80 text-center mt-4">
            Copie o código e envie para seus amigos!
          </p>
        </>
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
