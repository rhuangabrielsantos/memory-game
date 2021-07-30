import React from "react";
import { useEffect } from "react";

import { database } from "../services/firebase";
import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";

export default function Ranking() {
  const { user } = useAuth();
  const [ranking, setRanking] = React.useState([]);

  async function handleVictory() {
    await database.ref("ranking").push({
      score: 2,
      user: {
        name: user.name,
        avatar: user.avatar,
      },
    });
  }

  useEffect(() => {
    const rankingRef = database.ref("ranking");

    rankingRef.on("value", game => {
      const databaseRanking = game.val();

      if (databaseRanking) {
        setRanking(Object.values(databaseRanking));
      }
    });

    return () => {
      rankingRef.off("value");
    };
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center w-screen h-1/2 mt-5">
      {ranking.length === 0 ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <h1 className="font-righteous text-cullen text-5xl mb-10">Ranking</h1>
          <table className="w-80">
            <tbody>
              {ranking.map((item, index) => {
                return (
                  index < 5 && (
                    <tr key={index}>
                      <td className="font-righteous text-lg text-cullen w-1/8">
                        {index + 1}º
                      </td>
                      <td>
                        <img
                          src={item.user.avatar}
                          alt={item.user.name}
                          className="rounded-full w-9"
                        />
                      </td>

                      <td className="font-righteous text-lg text-cullen mr-5 w-4/8">
                        {item.user.name}
                      </td>
                      <td className="font-righteous text-lg text-cullen mr-5 w-1/8">
                        {item.score}
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
