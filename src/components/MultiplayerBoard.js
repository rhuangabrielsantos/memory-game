import React from "react";

import MultiplayerCard from "./MultiplayerCard";

export default function MultiplayerBoard({ cards, gameId }) {
  if (cards.length === 0) return;

  return (
    <div className="grid grid-cols-4">
      {cards.map(card => {
        return (
          <MultiplayerCard
            options={card}
            gameId={gameId}
            isOpen={card.isOpen}
            key={card.id}
          />
        );
      })}
    </div>
  );
}
