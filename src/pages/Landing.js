import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";
import Logo from "../assets/logo.svg";
import Screen from "../components/Screen";

export default function Landing() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/home");
  }

  return (
    <Screen>
      <div className="flex items-center justify-center mb-36 md:mb-24">
        <img src={Logo} alt="Logo" className="w-20 h-auto m-3 md:w-48 md:m-8" />
        <h1 className="font-righteous text-cullen text-4xl md:text-7xl">
          Memory Game
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center">
        <Link to="/alone/game">
          <button className="bg-indigo-700 mb-5 md:mb-0 md:mr-5 hover:bg-opacity-75 duration-300 w-48 h-14 font-righteous text-cullen text-1xl rounded-xl md:w-80 md:h-20 md:text-2xl">
            Jogar Sozinho
          </button>
        </Link>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center bg-marcelin hover:bg-opacity-75 duration-300 w-48 h-14 font-righteous text-cullen text-1xl rounded-xl md:w-80 md:h-20 md:text-2xl"
        >
          <FaGoogle className="mr-2" />
          Jogar com amigos
        </button>
      </div>

      <h3 className="font-roboto mt-3 text-cullen text-sm md:text-sm">
        Para jogar com seus amigos, faça login com o google
      </h3>

      <Footer />
    </Screen>
  );
}
