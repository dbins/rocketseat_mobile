import React from "react";
import "./config/ReactotronConfig";
import { Provider } from "react-redux";
import { setNavigator } from "./services/navigation";
import Routes from "./routes/index";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <Routes ref={setNavigator} />
  </Provider>
);

export default App;
