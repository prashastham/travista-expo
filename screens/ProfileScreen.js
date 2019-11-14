<<<<<<< HEAD
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Video from "react-native-video";
=======
import { createStackNavigator } from "react-navigation";
import Profile from "./Profile/Profile";
import Friend from "./Profile/Friend";
import EditProfile from './Profile/EditProfile';
>>>>>>> master


const ProfileStackNavigator = createStackNavigator(
  {
    Profile:Profile,
    Friend: Friend,
    EditProfile: EditProfile
  },
  { initialRouteName: "Profile" }
);

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default ProfileScreen;
=======
export default ProfileStackNavigator;
>>>>>>> master
