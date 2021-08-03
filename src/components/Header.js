import React from "react";
import { FaGoogle } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { IoPodium } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const history = useHistory();

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }
  }

  async function handleSignOut() {
    await signOut();

    history.push("/");
  }

  return user !== undefined ? (
    <>
      <div className="flex items-center justify-center absolute left-5 top-5">
        <Link to="/home">
          <TiHome
            className="text-cullen hover:opacity-80 duration-300 w-9 h-auto mr-3"
            title="Home"
          />
        </Link>
        <Link to="/ranking">
          <IoPodium
            className="text-cullen hover:opacity-80 duration-300 w-9 h-auto"
            title="Ranking"
          />
        </Link>
      </div>

      <div className="absolute top-5 right-5 flex items-center justify-center gap-3">
        <img src={user.avatar} alt={user.name} className="w-9 rounded-full" />
        <button
          className="w-24 h-9 font-righteous bg-marcelin hover:opacity-80 duration-300 text-white rounded-md"
          onClick={handleSignOut}
        >
          Sair
        </button>
      </div>
    </>
  ) : (
    <div className="absolute top-5 right-5 flex items-center justify-center gap-3">
      <button
        className="w-24 h-9 bg-marcelin text-white rounded-md flex items-center justify-center"
        onClick={handleLogin}
      >
        <FaGoogle className="mr-2" />
        Login
      </button>
    </div>
  );
}
