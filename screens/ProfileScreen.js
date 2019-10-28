import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
  }
});

export default ProfileScreen;
