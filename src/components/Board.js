import React from 'react'
import { connect } from 'react-redux'

import Card from './Card'

const Board = ({ cards }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen">
      <div>
        {cards.map((card) => {
          return <Card options={card} isOpen={card.isOpen} key={card.id} />
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cards: state.game.cards,
})

export default connect(mapStateToProps)(Board)
