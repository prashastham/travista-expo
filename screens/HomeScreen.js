import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Card, Button, Avatar, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";

import dummy_posts from "../dummy_data/dummy_posts";
const posts = dummy_posts;

const HomeScreen = props => {
  const [date, setDate] = useState("");

  useEffect(() => {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var ampm = hours >= 12 ? "pm" : "am";

    setDate((hours % 12) + ":" + (min < 10 ? "0" + min : min) + " " + ampm);
  });

  return (
    <ScrollView style={styles.container} contentOffset={{ x: 10, y: 10 }}>
      {posts.map((u, i) => {
        return (
          <Card
            ContainerStyle={styles.postContainer}
            key={i}
            title={
              <View style={styles.header}>
                <View style={styles.avatar}>
                  <Avatar
                    size="medium"
                    source={{ uri: u.avatar }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
                <View style={styles.user}>
                  <Text></Text>
                  <TouchableOpacity>
                    <Text style={styles.user}>{u.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.date}>{date}</Text>
                </View>
              </View>
            }
          >
            <View>
              <Text style={styles.description}>{u.description}</Text>
            </View>
            <TouchableOpacity onPress={() => console.log("Picture clicked")}>
              <Image
                source={{ uri: u.image }}
                style={{
                  flex: 1,
                  minHeight: Dimensions.get("window").height * 0.4,
                  Width: Dimensions.get("window").width
                }}
                resizeMode="stretch"
                PlaceholderContent={<ActivityIndicator />}
              />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <Button
                icon={
                  <Icon
                    name="thumbs-up"
                    size={15}
                    color={Colors.iconColor}
                    padding={5}
                  />
                }
                type="clear"
                iconLeft
                title="  Like"
              />
              <Button
                icon={
                  <Icon
                    name="comments"
                    size={15}
                    color={Colors.iconColor}
                    padding={5}
                  />
                }
                type="clear"
                iconLeft
                title="  Comment"
              />
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
};

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    maxWidth: Dimensions.get("screen").width
  },
  postContainer: {
    flexDirection: "row",
    width: 400,
    width: 300,
    maxHeight: Dimensions.get("screen").height,
    maxWidth: Dimensions.get("screen").width * 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  user: {
    fontSize: 16,
    fontWeight: "100"
  },
  date: {
    color: "#ccc",
    fontWeight: "500"
  },
  avatar: {
    padding: 5
  },
  description: {
    padding: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

export default HomeScreen;
