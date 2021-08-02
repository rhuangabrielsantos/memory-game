import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Home from "./pages/Home";
import Landing from "./pages/Landing";
import MultiplayerGame from "./pages/MultiplayerGame";
import MultiplayerLobby from "./pages/MultiplayerLobby";
import Ranking from "./pages/Ranking";
import SinglePlayerGame from "./pages/SinglePlayerGame";

import { AuthContextProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Provider store={store}>
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/home" component={Home} />
            <Route path="/ranking" component={Ranking} />
            <Route path="/alone/game" component={SinglePlayerGame} />
            <Route path="/:id/lobby" component={MultiplayerLobby} />
            <Route path="/:id/game" component={MultiplayerGame} />
          </Switch>
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
