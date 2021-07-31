import React from "react";

export default function User({ user, turn }) {
  if (!user?.avatar || !user?.name) {
    return <div></div>;
  }

  return (
    <div className="flex items-center justify-center m-5">
      <img
        src={user.avatar}
        alt={user.name}
        className={`rounded-full w-20 ${turn && "border-4 border-marcelin"}`}
      />
    </div>
  );
}
