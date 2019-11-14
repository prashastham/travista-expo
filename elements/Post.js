import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Post = props => {
  return (
    <View style={styles.postContainer}>
      <Card></Card>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: "column",
    maxHeight: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width,
    minWidth: "90%",
    justifyContent: "center",
    alignItems: "center"
  }
});
