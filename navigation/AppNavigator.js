import React from "react";
import {Platform} from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from "react-navigation";

import AppTabNavigator from "./AppTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import AuthLoadingScreen from "../screens/Auth/AuthLoadingScreen";
import VerifyScreen from '../screens/Auth/VerifyScreen';

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});




export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: AuthLoadingScreen,
      Auth: AuthStackNavigator,
      App: AppTabNavigator,
      Verify:VerifyScreen,
    },
    {
      initialRouteName: "Loading"
    }
  )
);
