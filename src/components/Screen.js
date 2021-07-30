import React from "react";

export default function Screen(props) {
  return (
    <div className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen">
      {props.children}
    </div>
  );
}
