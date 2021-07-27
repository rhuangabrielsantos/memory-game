import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Fireworks from "./components/Fireworks";
import Game from "./pages/Game";
import Home from "./pages/Home";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Home} exact />
        <Route path="/game" component={Game} />
        <Fireworks />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
