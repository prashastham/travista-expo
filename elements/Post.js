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
import moment from 'moment';

import dummy_posts from "../dummy_data/dummy_posts";
const posts = dummy_posts;

const Post = props => {
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
            containerStyle={styles.postContainer}
            key={i}
            title={
              <View style={styles.header}>
                <View style={styles.avatar}>
                  <Avatar
                    size="medium"
                    source={{ uri: u.dpurl }}
                    rounded
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
                <View style={styles.user}>
                  <Text></Text>
                  <TouchableOpacity>
                    <Text style={styles.user}>{u.userHandle}</Text>
                  </TouchableOpacity>
                  <Text style={styles.date}>{moment(u.createdAt).format("YYYY-MM-DD h:mm")}</Text>
                </View>
              </View>
            }
          >
            <View>
              <Text style={styles.description}>{u.body}</Text>
            </View>
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={() => console.log("Picture clicked")}>
                <Image
                  source={{ uri: u.image }}
                  style={{
                    flexGrow: 1,
                    minHeight: Dimensions.get("window").height * 0.4
                  }}
                  resizeMode="stretch"
                  PlaceholderContent={<ActivityIndicator />}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                icon={
                  <Icon
                    name="thumbs-up"
                    size={18}
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
                    size={18}
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

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get("screen").width
  },
  postContainer: {
    marginHorizontal: 5,
    borderRadius: 5
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
  imageContainer: {
    // backgroundColor:'#f00',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#af4",
    borderBottomColor: "#af4"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

export default Post;
