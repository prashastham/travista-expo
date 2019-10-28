import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MapScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Map screen</Text>
    </View>
  );
};

MapScreen.navigationOptions = {
  title: "Map"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white"
  }
});

export default MapScreen;
