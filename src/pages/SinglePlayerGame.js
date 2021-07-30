import React from "react";
import { FaArrowLeft, FaUndoAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Board from "../components/Board";
import Fireworks from "../components/Fireworks";
import Footer from "../components/Footer";
import { createShuffledCards } from "../store/reducers/game";

export default function SinglePlayerGame() {
  const dispatch = useDispatch();
  const cards = createShuffledCards();

  dispatch({ type: "CREATE_GAME", cards });

  function restartGame() {
    window.location.reload();
  }

  return (
    <>
      <Link to="/">
        <FaArrowLeft className="text-white text-4xl mb-4 absolute left-5 top-5" />
      </Link>

      <FaUndoAlt
        onClick={restartGame}
        className="text-white text-4xl mb-4 absolute right-5 top-5 cursor-pointer"
      />

      <div className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen">
        <Board />
        <Footer />
      </div>

      <Fireworks />
    </>
  );
}
