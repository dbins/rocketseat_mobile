import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import { colors } from "../styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import Dashboard from "../pages/Dashboard/";
import Perfil from "../pages/Perfil";
import NovoMeetup from "../pages/NovoMeetup";
import Busca from "../pages/Busca";
import DetalheMeetup from "../pages/DetalheMeetup";

export default createBottomTabNavigator(
  {
    NovoMeetup: {
      screen: NovoMeetup
    },
    App: {
      screen: createStackNavigator(
        {
          Dashboard: { screen: Dashboard },
          Perfil: { screen: Perfil },
          DetalheMeetup: { screen: DetalheMeetup }
        },
        {
          defaultNavigationOptions: {
            header: null
          }
        }
      ),
      navigationOptions: ({ navigation }) => {
        let tabBarVisible = true;
        const routesWithoutTabs = ["Perfil"];

        if (navigation.state.routes.length > 1) {
          navigation.state.routes.map(route => {
            if (routesWithoutTabs.includes(route.routeName)) {
              tabBarVisible = false;
            }
          });
        }
        let tabBarIcon = ({ tintColor }) => (
          <Icon name="home" size={20} color={tintColor} />
        );

        return {
          tabBarIcon,
          tabBarVisible
        };
      }
    },
    Busca: {
      screen: Busca
    }
  },
  {
    initialRouteName: "App",
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
);
