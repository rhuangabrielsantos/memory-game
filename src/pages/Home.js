import React from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Logo from "../assets/logo.svg";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen">
      <div className="flex items-center justify-center">
        <img src={Logo} alt="Logo" className="w-20 h-auto m-3 md:w-48 md:m-8" />
        <h1 className="font-righteous text-cullen text-4xl md:text-7xl">
          Memory Game
        </h1>
      </div>

      <Link to="/game">
        <button className="bg-marcelin w-48 h-14 mt-36 font-righteous text-cullen text-2xl rounded-xl md:mt-24 md:w-80 md:h-20 md:text-4xl">
          Play
        </button>
      </Link>

      <Footer />
    </div>
  );
}
