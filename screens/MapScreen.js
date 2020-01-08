import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import Marker from "react-native-maps";
import Colors from "../constants/Colors";
import HeaderIcon from '../components/HeaderIcon';

const MapScreen = props => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.927079,
          longitude: 79.861244,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    </View>
  );
};

MapScreen.navigationOptions = {
  title: "Map",
  headerTintColor:Colors.stackHeaderTintColor,
  headerLeft:<HeaderIcon/>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white"
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

export default MapScreen;
