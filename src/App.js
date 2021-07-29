import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Home from "./pages/Home";

import { AuthContextProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Provider store={store}>
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/game/:id" component={Game} />
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
