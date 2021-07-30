import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Dashboard from "./pages/Dashboard";
import MultiplayerGame from "./pages/MultiplayerGame";
import Home from "./pages/Home";
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
            <Route path="/game/alone" component={SinglePlayerGame} />
            <Route path="/game/:id" component={MultiplayerGame} />
          </Switch>
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
