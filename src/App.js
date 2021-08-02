import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
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
            <Route path="/" component={Home} exact />
            <Route path="/dashboard" component={Dashboard} />
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
