import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import Fireworks from "./components/Fireworks";
import Main from "./components/Main";

const App = () => {
  return (
    <Provider store={store}>
      <Main />
      <Fireworks />
    </Provider>
  );
};

export default App;
