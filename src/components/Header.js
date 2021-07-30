import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
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
    <div className="absolute top-5 right-5 flex items-center justify-center gap-3">
      <img src={user.avatar} alt={user.name} className="w-7 rounded-full" />
      <h1 className="font-righteous text-cullen">{user.name}</h1>
      <button
        className="w-24 h-9 bg-marcelin text-white rounded-md"
        onClick={handleSignOut}
      >
        Sair
      </button>
    </div>
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
