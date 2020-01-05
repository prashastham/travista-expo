import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AppTabNavigator from "./AppTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import AuthLoadingScreen from "../screens/Auth/AuthLoadingScreen";
import VerifyScreen from '../screens/Auth/VerifyScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: AuthLoadingScreen,
      Auth: AuthStackNavigator,
      App: AppTabNavigator,
      Verify:VerifyScreen
    },
    {
      initialRouteName: "Loading"
    }
  )
);
