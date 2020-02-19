import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../../constants/Colors";
import HeaderIcon from "../../components/HeaderIcon";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { FloatingAction } from "react-native-floating-action";

class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  actions = [
    {
      text: "Search",
      icon: require("../../assets/white_icon/search_white.png"),
      name: "bt_Search",
      position: 1,
      buttonSize: 50
    },
    {
      text: "Create Event",
      icon: require("../../assets/white_icon/event_white.png"),
      name: "bt_Trip",
      position: 2,
      buttonSize: 50
    }
  ];
  state = {
    region: {
      latitude: 6.8612775,
      longitude: 79.892156,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    isloading: false
  };

  componentDidMount = async () => {
    this.props.navigation.addListener("willFocus", async () => {
      await this.getPermissionAsync();
      Location.setApiKey("AIzaSyCN1tAyAammD_ym0fJsvLhc0z_hJfwxtWc"); //google api key
      const ll = await Location.geocodeAsync("makumbura galle sri lanka");
      console.log("matara");
      console.log(ll);
      this.setlocation = setInterval(() => {
        this.regionChange();
      }, 8000);
    });
    this.props.navigation.addListener("willBlur", () => {
      clearInterval(this.setlocation);
    });
  };

  regionChange = async () => {
    const data = await Location.getCurrentPositionAsync({ accuracy: 5 });
    console.log(data);
    this.setState({
      region: {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  };

  getPermissionAsync = async () => {
    this.setState({ isloading: true });
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("Sorry, we need Location permissions to make this work!");
    } else {
      const data = await Location.getCurrentPositionAsync({ accuracy: 5 });
      console.log(data);
      this.setState({
        region: {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      });
    }
    this.setState({ isloading: false });
  };

  render() {
    if (this.state.isloading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="c6c6c6" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MapView style={styles.map} region={this.state.region}>
            <Marker
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude
              }}
              pinColor="#5548f9"
              title="Me"
            />
          </MapView>
          <FloatingAction
            actions={this.actions}
            onPressItem={name => {
              if (name === "bt_Search") {
                this.props.navigation.navigate("Search");
              } else if (name === "bt_Trip") {
                this.props.navigation.navigate("CreateTrip");
              }
            }}
          />
        </View>
      );
    }
  }
}

MapScreen.navigationOptions = {
  title: "Map",
  headerTintColor: Colors.stackHeaderTintColor,
  headerLeft: <HeaderIcon />
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    height: "100%"
  },
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
