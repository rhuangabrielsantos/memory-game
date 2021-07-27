import React from "react";

import Board from "./Board";
import Footer from "./Footer";

export default function Main() {
  return (
    <div className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen">
      <Board />
      <Footer />
    </div>
  );
}
