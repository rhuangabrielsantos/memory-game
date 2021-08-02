import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import ConfigurationGame from "../components/ConfigurationGame";
import Screen from "../components/Screen";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { createArrayCards } from "../store/reducers/cards";
import OptionGame from "../components/OptionGame";

export default function Home() {
  const history = useHistory();
  const { user } = useAuth();
  const [is16, setIs16] = useState(true);
  const [is24, setIs24] = useState(false);

  function set16Game() {
    setIs16(true);
    setIs24(false);
  }

  function set24Game() {
    setIs16(false);
    setIs24(true);
  }

  async function handleCreateGame() {
    const gameRef = database.ref("games");
    const cards = createArrayCards(is16 ? 16 : 24);

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

      <h1 className="font-righteous text-cullen text-xl">
        Escolha a quantidade de cartas
      </h1>

      <ConfigurationGame>
        <OptionGame format="16" active={is16} onClick={set16Game} />
        <OptionGame format="24" active={is24} onClick={set24Game} />
      </ConfigurationGame>

      {user ? (
        <button
          onClick={handleCreateGame}
          className="flex items-center justify-center bg-indigo-700 mb-2 hover:bg-opacity-75 duration-300 w-64 h-14 font-righteous text-cullen text-xl rounded-md"
          disabled={!user}
        >
          <FaPlus className="mr-2" />
          Criar novo jogo
        </button>
      ) : (
        // TODO: Criar um layout pra essa porra
        <h1>Faça login para criar um novo jogo</h1>
      )}
    </Screen>
  );
}
