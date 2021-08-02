import React from "react";
import { useSelector } from "react-redux";

import Fireworks from "./Fireworks";
import Card from "./Card";

export default function Board() {
  const cards = useSelector(state => state.game.cards);
  const endGame = useSelector(state => state.game.endGame);

  return (
    <>
      <div className="grid grid-cols-4">
        {cards.map(card => {
          return <Card options={card} isOpen={card.isOpen} key={card.id} />;
        })}
      </div>

      <Fireworks gameWasFinished={endGame} />
    </>
  );
}
