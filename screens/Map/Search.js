import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions} from 'react-native';
import MapView,{Marker} from "react-native-maps";
import Colors from "../../constants/Colors";
import HeaderIcon from '../../components/HeaderIcon';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Search extends Component {
  static navigationOptions = {
    title: "View Locaation",
    headerTintColor:Colors.stackHeaderTintColor,
  }
  constructor(props) {
    super(props);
  }
  state = {
    region: {
        latitude: 6.8612775,
        longitude: 79.892156,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    isloading:false,
  }


  render() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={this.state.region}
            >
                <Marker 
                    coordinate={{latitude:this.state.region.latitude,longitude:this.state.region.longitude}}
                    pinColor='#5548f9'
                    title = 'Me'
                />
            </MapView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    loadingContainer:{
        flex:1,
        justifyContent:'center',
        height:'100%',
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
