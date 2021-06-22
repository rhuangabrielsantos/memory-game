import React from 'react'
import { useSelector } from 'react-redux'

import Card from './Card'

export default function Board() {
  const cards = useSelector(state => state.game.cards)

  return (
    <div className="flex flex-col items-center justify-center bg-nosferatu h-screen w-screen">
      <div className="grid grid-cols-4">
        {cards.map(card => {
          return <Card options={card} isOpen={card.isOpen} key={card.id} />
        })}
      </div>
    </div>
  )
}
