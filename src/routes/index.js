import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Preferencias from "../pages/Preferencias";
import Tabs from "./tabs";

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Login,
      Cadastro,
      Tabs,
      Preferencias
    },
    {
      initialRouteName: "Login"
    }
  )
);
export default Routes;
