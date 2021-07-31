import React from "react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import MultiplayerCard from "./MultiplayerCard";
import User from "./User";

export default function MultiplayerBoard({ cards, gameId }) {
  const { user } = useAuth();
  const [myUser, setMyUser] = React.useState({});
  const [otherPlayers, setOtherPlayers] = React.useState([]);
  const [endMessage, setEndMessage] = React.useState(undefined);

  useEffect(() => {
    const endMessageRef = database.ref(`games/${gameId}/endMessage`);

    endMessageRef.on("value", snapshot => {
      const endMessage = snapshot.val();
      setEndMessage(endMessage);
    });

    const ref = database.ref(`/games/${gameId}/players/`);

    ref.on("value", snapshot => {
      const players = [];

      snapshot.forEach(function (childSnapshot) {
        const player = childSnapshot.val();

        if (player.id === user.id) {
          setMyUser(player);
          return;
        }

        players.push(player);
        return;
      });

      setOtherPlayers(players);
    });

    return () => {
      endMessageRef.off("value");
      ref.off("value");
    };
  }, [user?.id, gameId]);

  if (cards.length === 0) return;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <User user={myUser.user} turn={myUser.myTurn} />
        <h1 className="font-righteous text-cullen">{myUser.score}</h1>
      </div>
      <div className="grid grid-cols-4">
        {cards.map(card => {
          return (
            <MultiplayerCard
              options={card}
              gameId={gameId}
              isOpen={card.isOpen}
              key={card.id}
              turn={myUser.myTurn}
              userId={myUser.id}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-center h-auto">
        {otherPlayers.map(player => {
          return (
            <div className="flex items-center justify-center" key={player.id}>
              <User user={player.user} turn={player.myTurn} />
              <h1 className="font-righteous text-cullen">{player.score}</h1>
            </div>
          );
        })}
      </div>
      {endMessage && (
        <h1 className="text-cullen font-righteous text-sm">{endMessage}</h1>
      )}
    </div>
  );
}
