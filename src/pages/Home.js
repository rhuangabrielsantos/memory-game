import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";
import Logo from "../assets/logo.svg";

export default function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen">
      <div className="flex items-center justify-center mb-36 md:mb-24">
        <img src={Logo} alt="Logo" className="w-20 h-auto m-3 md:w-48 md:m-8" />
        <h1 className="font-righteous text-cullen text-4xl md:text-7xl">
          Memory Game
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center">
        <Link to="/game">
          <button className="bg-indigo-700 mb-5 md:mb-0 md:mr-5 hover:bg-opacity-75 duration-300 w-48 h-14 font-righteous text-cullen text-1xl rounded-xl md:w-80 md:h-20 md:text-2xl">
            Jogar como convidado
          </button>
        </Link>
        <button
          onClick={handleLogin}
          className="bg-marcelin hover:bg-opacity-75 duration-300 w-48 h-14 font-righteous text-cullen text-1xl rounded-xl md:w-80 md:h-20 md:text-2xl"
        >
          Entrar com Google
        </button>
      </div>

      <Footer />
    </div>
  );
}
