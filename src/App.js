import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

import Board from './components/Board'
import Fireworks from './components/Fireworks'

const App = () => {
  return (
    <Provider store={store}>
      <Board />
      <Fireworks />
    </Provider>
  )
}

export default App
