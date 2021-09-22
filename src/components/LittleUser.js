import React from "react";

export default function LittleUser({ user, turn }) {
  if (!user?.avatar || !user?.name) {
    return <div></div>;
  }

  return (
    <div className="flex items-center justify-center m-3">
      <img
        src={user.avatar}
        alt={user.name}
        className={`rounded-full w-8 ${turn && "border-4 border-marcelin"}`}
      />
    </div>
  );
}
