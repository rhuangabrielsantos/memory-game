import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import ConfigurationGame from "../components/ConfigurationGame";
import Screen from "../components/Screen";

import Landing from "./Landing";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { createArrayCards } from "../store/reducers/cards";
import OptionGame from "../components/OptionGame";

export default function Home() {
  const history = useHistory();
  const { user } = useAuth();
  const [is16, setIs16] = useState(true);
  const [is24, setIs24] = useState(false);
  const [is32, setIs32] = useState(false);
  const [is50, setIs50] = useState(false);

  function set16Game() {
    setIs16(true);
    setIs24(false);
    setIs32(false);
    setIs50(false);
  }

  function set24Game() {
    setIs16(false);
    setIs24(true);
    setIs32(false);
    setIs50(false);
  }

  function set32Game() {
    setIs16(false);
    setIs24(false);
    setIs32(true);
    setIs50(false);
  }

  function set50Game() {
    setIs16(false);
    setIs24(false);
    setIs32(false);
    setIs50(true);
  }

  async function handleCreateGame() {
    const cardsLength = is16 ? 16 : is24 ? 24 : is32 ? 32 : is50 ? 50 : 16;
    const cards = createArrayCards(cardsLength);

    const gameRef = database.ref("games");
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
      {user ? (
        <>
          <Header />
          <h1 className="font-righteous text-cullen text-xl">
            Escolha a quantidade de cartas
          </h1>

          <ConfigurationGame>
            <OptionGame format="16" active={is16} onClick={set16Game} />
            <OptionGame format="24" active={is24} onClick={set24Game} />
            <OptionGame format="32" active={is32} onClick={set32Game} />
            <OptionGame format="50" active={is50} onClick={set50Game} />
          </ConfigurationGame>
          <button
            onClick={handleCreateGame}
            className="flex items-center justify-center bg-indigo-700 mb-2 hover:bg-opacity-75 duration-300 w-64 h-14 font-righteous text-cullen text-xl rounded-md"
            disabled={!user}
          >
            <FaPlus className="mr-2" />
            Criar novo jogo
          </button>
        </>
      ) : (
        <>
          <Landing />
        </>
      )}
    </Screen>
  );
}
