import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar
} from "react-native";
import firebase from "../../local/FirebaseClient";

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "App" : "Auth");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ padding: 15 }}>
          <ActivityIndicator size="large" color="#ccc" />
        </View>
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

AuthLoadingScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AuthLoadingScreen;
