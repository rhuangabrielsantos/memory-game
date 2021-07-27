import React from "react";

import Board from "../components/Board";
import Footer from "../components/Footer";

export default function Game() {
  return (
    <div className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen">
      <Board />
      <Footer />
    </div>
  );
}
