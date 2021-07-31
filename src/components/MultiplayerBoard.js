import React from "react";
// import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
// import { database } from "../services/firebase";

import MultiplayerCard from "./MultiplayerCard";
import User from "./User";

export default function MultiplayerBoard({ cards, gameId }) {
  const { user } = useAuth();
  // const [myUser, setMyUser] = React.useState({});

  // useEffect(() => {
  //   const playersRef = database.ref(`games/${gameId}/players`);

  //   playersRef.on("value", players => {
  //     const databasePlayers = players.val();
  //     setMyUser(databasePlayers.find(player => player.id === user.uid) || {});
  //   });

  //   return () => {
  //     playersRef.off("value");
  //   };
  // }, [gameId]);

  if (cards.length === 0) return;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <User user={myUser} turn={myUser.myTurn} /> */}
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
      <div className="flex items-center justify-center h-auto">
        <User user={user} />
        <User user={user} />
        <User user={user} />
      </div>
    </div>
  );
}
