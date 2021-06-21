import React from 'react'

import { connect } from 'react-redux'

import './index.css'

const Fireworks = ({ gameWasFinished }) => {
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
    )
  }

  return <div />
}

const mapStateToProps = (state) => ({
  gameWasFinished: state.game.status,
})

export default connect(mapStateToProps)(Fireworks)
