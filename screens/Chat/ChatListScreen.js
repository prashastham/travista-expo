import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatListScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Chat List screen</Text>
    </View>
  );
};

ChatListScreen.navigationOptions = {
  title: "Chat"
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