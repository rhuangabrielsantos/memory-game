import React from "react";

export default function OptionGame({ active, format, ...props }) {
  return (
    <div
      className={`cursor-pointer flex items-center justify-center w-36 h-36 border-2 border-dracula hover:opacity-90 duration-300 rounded-lg m-2 ${
        active && "bg-dracula"
      }`}
      {...props}
    >
      <span className="font-righteous text-cullen text-5xl">{format}</span>
    </div>
  );
}
