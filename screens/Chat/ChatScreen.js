import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Chat screen</Text>
    </View>
  );
};

ChatScreen.navigationOptions = {
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

export default ChatScreen;
