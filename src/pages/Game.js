import React from "react";
import { FaArrowLeft, FaUndoAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import Board from "../components/Board";
import Fireworks from "../components/Fireworks";
import Footer from "../components/Footer";

export default function Game() {
  const { user } = useAuth();

  console.log(user);

  function restartGame() {
    window.location.reload();
  }

  return (
    <>
      <Link to="/">
        <FaArrowLeft className="text-white text-4xl mb-4 absolute left-5 top-5" />
      </Link>
      <Link onClick={restartGame} to="/game">
        <FaUndoAlt className="text-white text-4xl mb-4 absolute right-5 top-5" />
      </Link>

      <div className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen">
        <Board />
        <Footer />
      </div>

      <Fireworks />
    </>
  );
}
