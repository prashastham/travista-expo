import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AppTabNavigator from "./AppTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import AuthLoadingScreen from "../screens/Auth/AuthLoadingScreen";

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: AuthLoadingScreen,
      Auth: AuthStackNavigator,
      App: AppTabNavigator
    },
    {
      initialRouteName: "Auth"
    }
  )
);
