import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import MultiplayerBoard from "../components/MultiplayerBoard";
import Fireworks from "../components/Fireworks";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import { database } from "../services/firebase";
import Screen from "../components/Screen";
import Header from "../components/Header";

export default function MultiplayerGame() {
  const params = useParams();
  const gameId = params.id;

  const [cards, setCards] = React.useState([]);
  const [gameWasFinished, setGameWasFinished] = React.useState(false);

  useEffect(() => {
    const gameRef = database.ref(`games/${gameId}`);

    gameRef.on("value", game => {
      const databaseGame = game.val();

      setCards(databaseGame.cards);
      setGameWasFinished(databaseGame.gameWasFinished);
    });

    return () => {
      gameRef.off("value");
    };
  }, [gameId]);

  if (cards.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <Screen>
        <Header />
        <MultiplayerBoard cards={cards} gameId={gameId} />
        <Footer />
      </Screen>

      <Fireworks gameWasFinished={gameWasFinished} />
    </>
  );
}
