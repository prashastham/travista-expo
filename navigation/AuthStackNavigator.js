import React from "react";
import { createStackNavigator } from "react-navigation";

import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";

//switch between the Login page and the SignUp page

const AuthStackNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignupScreen
  },
  { initialRouteName: "Login" }
);

export default AuthStackNavigator;
