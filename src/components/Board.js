import React from "react";

import Card from "./Card";

export default function Board({ cards }) {
  if (cards.length === 0) return;

  return (
    <div className="grid grid-cols-4">
      {cards.map(card => {
        return <Card options={card} isOpen={card.isOpen} key={card.id} />;
      })}
    </div>
  );
}
