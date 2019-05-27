import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "./styles";

import Dashboard from "./pages/Dashboard/";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import DetalheMeetup from "./pages/DetalheMeetup";
import NovoMeetup from "./pages/NovoMeetup";
import Perfil from "./pages/Perfil";
import Preferencias from "./pages/Preferencias";
import Busca from "./pages/Busca";

const linksInternos = createStackNavigator(
  {
    NovoMeetup: { screen: NovoMeetup },
    Perfil: { screen: Perfil },
    DetalheMeetup: { screen: DetalheMeetup }
  },
  {
    headerMode: "none",
    initialRouteName: "NovoMeetup"
  }
);

linksInternos.navigationOptions = {
  headerVisible: false,
  tabBarIcon: ({ tintColor }) => (
    <Icon name="plus-square" size={20} color={tintColor} />
  )
};

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Cadastro,
    Preferencias,
    App: createStackNavigator(
      {
        Home: createBottomTabNavigator(
          {
            NovoMeetup: linksInternos,
            Dashboard,
            Busca
          },
          {
            initialRouteName: "Dashboard",
            tabBarOptions: {
              showIcon: true,
              showLabel: false,
              activeTintColor: colors.white,
              inactiveTintColor: colors.whiteTransparent,
              style: {
                backgroundColor: colors.primary
              }
            }
          }
        )
      },
      { initialRouteName: "Home", headerMode: "none" }
    )
  })
);

export default Routes;
