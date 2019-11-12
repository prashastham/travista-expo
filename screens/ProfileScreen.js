import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Video from "react-native-video";

const ProfileScreen = porps => {
  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
    </View>
  );
};

ProfileScreen.navigationOptions = {
  title: "Profile"
};

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
