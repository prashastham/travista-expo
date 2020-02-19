import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform
} from "react-native";
import { SearchBar, Button, Icon } from "react-native-elements";
import Modal from "react-native-modal";
import MapView, { Marker } from "react-native-maps";
import Colors from "../../constants/Colors";
import HeaderIcon from "../../components/HeaderIcon";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Pics from "../../elements/MapLocationPics";

export default class Search extends Component {
  static navigationOptions = {
    title: "View Location",
    headerTintColor: Colors.stackHeaderTintColor
  };
  constructor(props) {
    super(props);
  }
  state = {
    region: {
      latitude: 6.8612775,
      longitude: 79.892156,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    mylat: 0,
    mylong: 0,
    searchText: "",
    isModalVisible: false,
    isloading: false
  };

  componentDidMount = async () => {
    await this.getPermissionAsync();
    Location.setApiKey("AIzaSyCN1tAyAammD_ym0fJsvLhc0z_hJfwxtWc"); //google api key
  };

  searchOnChange(text) {
    this.setState({ searchText: text });
  }

  search = async () => {
    if (this.state.searchText !== "" && this.state.searchText !== "Me") {
      data = await Location.geocodeAsync(this.state.searchText);
      console.log("searched location data", data);
      if (data.length) {
        region = {
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };
        this.setState({ region: region, isloading: true });
      } else {
        alert("Can't find Location!");
        this.setState({ searchText: "" });
      }
    }
  };

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("Sorry, we need Location permissions to make this work!");
    } else {
      const data = await Location.getCurrentPositionAsync({ accuracy: 5 });
      console.log("current position", data);
      this.setState({
        region: {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        },
        mylat: data.coords.latitude,
        mylong: data.coords.longitude
      });
    }
  };

  openLocation() {
    console.log("hello");
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${this.state.region.latitude},${this.state.region.longitude}`;
    const label = "Custom Label";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.state.region}>
          <Marker
            coordinate={{
              latitude: this.state.mylat,
              longitude: this.state.mylong
            }}
            title="Me"
            image={require("../../assets/images/blue_dot.png")}
          />
          {this.state.isloading ? (
            <Marker
              draggable={true}
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude
              }}
              title={this.state.searchText}
            />
          ) : null}
        </MapView>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: "#fof",
            alignItems: "center"
          }}
        >
          <View style={styles.searchBarContainer}>
            <SearchBar
              placeholder="Search Location..."
              lightTheme
              onChangeText={text => this.searchOnChange(text)}
              autoCorrect={false}
              value={this.state.searchText}
              inputContainerStyle={{
                backgroundColor: "#fff",
                borderRadius: 10
              }}
              containerStyle={styles.searchBar}
            />
            <Button
              title="Search"
              type="outline"
              containerStyle={{ flexGrow: 0.1, margin: 0 }}
              buttonStyle={styles.buttonStyle}
              onPress={() => this.search()}
            />
          </View>
          {this.state.searchText === "" || this.state.searchText === "Me" ? (
            <View>
              <Button
                type="solid"
                buttonStyle={styles.detailsButton}
                titleStyle={{ color: "#000" }}
                onPress={() => {
                  region = {
                    latitude: this.state.mylat,
                    longitude: this.state.mylong,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  };
                  this.setState({
                    region: region,
                    searchText: "Me",
                    isloading: false,
                    isModalVisible: true
                  });
                }}
                title="Current"
              />
            </View>
          ) : (
              <View>
                <Button
                  type="solid"
                  buttonStyle={styles.detailsButton}
                  titleStyle={{ color: "#000" }}
                  onPress={() => this.setState({ isModalVisible: true })}
                  title="View"
                />
              </View>
            )}
        </View>

        <Modal
          isVisible={this.state.isModalVisible}
          onSwipeComplete={() => this.setState({ isModalVisible: false })}
          swipeDirection={['down']}
          backdropOpacity={0.3}
          onBackButtonPress={() => this.setState({ isModalVisible: false })}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          style={styles.moreOptionModal}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{this.state.searchText}</Text>
              <TouchableOpacity style={styles.googleLocationContainer} onPress={() => this.openLocation()}>
                <Icon
                  name='location-on'
                  type='matirial-community'
                  color='#cccccc'
                />
                <Text style={styles.googleLocationText}>on Google maps</Text>
              </TouchableOpacity>
              <View style={styles.pictureHeader}>
                <Text style={styles.pictureTitle}>What People know..</Text>
                <Icon
                  raised
                  name='camera-alt'
                  type='matirial'
                  color='#f50'
                  size={20}
                  onPress={() => { this.setState({ isModalVisible: false }); this.props.navigation.navigate('MapPic', { region: this.state.region }) }}
                />
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 70 }}>
              <Pics region={this.state.region} />
            </View>
          </View>
        </Modal>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    height: "100%"
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  searchBarContainer: {
    flexShrink: 1,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingRight: 4,
    marginTop: 10
  },
  searchBar: {
    width: "85%",
    padding: 0,
    margin: 0,
    borderRadius: 10
  },
  buttonStyle: {
    flexShrink: 1,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#c6c6c6"
  },
  detailsButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 50,
    width: 200,
    marginVertical: 20
  },
  moreOptionModal: {
    justifyContent: "flex-end",
    margin: 0,
    marginTop: "15%"
  },
  modalContent: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    padding: 22,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalHeader: {
    flexShrink: 1,
    width: "100%",
    height: "20%"
  },
  modalTitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "500",
    justifyContent: "center",
    textAlign: "center",
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#c6c6c6"
  },
  googleLocationContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  googleLocationText: {
    paddingHorizontal: 5,
    color: "#00f",
    fontSize: 15,
    fontWeight: "500"
  },
  pictureHeader: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  pictureTitle: {
    fontSize: 17,
    color: "#5f6c91",
    fontWeight: "500"
  }
});
