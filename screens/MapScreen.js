import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Modal } from "react-native";
import { Card, Button, Avatar, Image, Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import Marker from "react-native-maps";
import Colors from "../constants/Colors";
import HeaderIcon from "../components/HeaderIcon";

const MapScreen = props => {
  const [modalTripVisible, setModalTripVisible] = useState(false);

  createTrip = () => {
    setModalTripVisible(true);
  };

  cancelCreateTrip = () => {
    setModalTripVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalTripVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View>
          <Header
            centerComponent={{
              text: "New Trip",
              style: { color: "#fff", fontSize: 18 }
            }}
            rightComponent={
              <Button
                icon={<Icon name="window-close" size={25} color={"#ff4f32"} />}
                type="clear"
                raised={true}
                onPress={() => cancelCreateTrip()}
              />
            }
          />
        </View>
      </Modal>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.927079,
          longitude: 79.861244,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      />
    </View>
  );
};

MapScreen.navigationOptions = {
  title: "Map",
  headerTintColor: Colors.stackHeaderTintColor,
  headerLeft: <HeaderIcon />,
  headerRight: (
    <Button
      icon={
        <Icon name="calendar" size={25} color={Colors.stackHeaderTintColor} />
      }
      title="+"
      type="clear"
      raised={true}
      onPress={() => createTrip()}
    />
  )
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
