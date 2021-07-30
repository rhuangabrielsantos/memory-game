import React from "react";

import "./styles.css";

export default function Fireworks({ gameWasFinished }) {
  if (gameWasFinished) {
    return (
      <div>
        <div className="firework" id="firework1">
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
        </div>
        <div className="firework" id="firework2">
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
        </div>
        <div className="firework" id="firework3">
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
          <div className="explosion"></div>
        </div>
      </div>
    );
  }

  return <div />;
}
