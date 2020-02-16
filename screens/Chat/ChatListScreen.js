import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  Card,
  Button,
  Avatar,
  Image,
  Header,
  Divider,
  Badge,
  withBadge
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
import HeaderIcon from "../../components/HeaderIcon";

import Storage from "../../local/Storage";

id = async () => {
  try {
    const value = await Storage.getItem("accessToken");
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};

const ChatListScreen = props => {
  const [name, setName] = useState("");
  const [dpurl, setDpurl] = useState("");
  return (
    <View style={styles.container}>
      <Text>Trip List screen</Text>
    </View>
  );
};

ChatListScreen.navigationOptions = {
  title: "Chat",
  headerTintColor: Colors.stackHeaderTintColor,
  headerLeft: <HeaderIcon />
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

export default ChatListScreen;
