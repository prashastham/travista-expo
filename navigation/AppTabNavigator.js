import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChatListScreen from "../screens/Chat/ChatListScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import OtherProfileScreen from "../screens/Profile/OtherProfile";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    OtherProfile: OtherProfileScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

HomeStack.path = "";

const ProfileStack = createStackNavigator({
  Profiles: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  OtherProfile: {
    screen: OtherProfileScreen
  }
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

ProfileStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-switch" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const MapStack = createStackNavigator(
  {
    Map: {
      screen:MapScreen,
      navigationOptions: () => ({
        header:null,
      }),
    },
    
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

MapStack.path = "";

const ChatStack = createStackNavigator(
  {
    Trips: ChatListScreen,
    Chat: ChatScreen
  },
  { initialRouteName: "Chat" }
);

ChatStack.navigationOptions = {
  tabBarLabel: "Chat",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-chatboxes" : "md-chatbubbles"}
    />
  )
};

ChatStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ProfileStack,
  MapStack,
  ChatStack,
  SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
