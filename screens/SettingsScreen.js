import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList
} from "react-native";

const SettingsScreen = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate({ routeName: "Auth" })}
      >
        <View style={styles.textList}>
          <Text style={{ fontSize: 16 }}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

SettingsScreen.navigationOptions = {
  title: "Settings"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textList: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "grey",
    borderColor: "black",
    borderWidth: 1
  }
});

export default SettingsScreen;
