import React from "react";
import { createStackNavigator } from "react-navigation";

import Profile from "./Profile/Profile";
import SignupScreen from "../screens/Auth/SignupScreen";

//switch between the Login page and the SignUp page

const AuthStackNavigator = createStackNavigator(
  {
    Profile: Profile,
    Friend: Friend
  },
  { initialRouteName: "Profile" }
);

export default AuthStackNavigator;
