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

const posts = [
  {
    id: 1,
    name: "Prashastha Mudannayake",
    avatar: "https://miro.medium.com/fit/c/256/256/0*rfrBJGvo5FXftsTx.",
    image: "https://picsum.photos/300/600",
    description: "Fun thama",
    likes: 0,
    likers: {},
    comments: {
      user_id: 2,
      comment: ""
    }
  },
  {
    id: 2,
    name: "Steve Jobs",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg",
    image: "https://picsum.photos/300/600",
    description: "Great click, it was an awesome trip",
    likes: 0,
    likers: {}
  },
  {
    id: 3,
    name: "Gotabhaya Rajapakse",
    avatar:
      "https://www.tamilguardian.com/sites/default/files/Image/pictures/2019/MAy%2018/Gotabaya%20Rajapaksa.jpg",
    image: "https://picsum.photos/300/600",
    description: "That was an awsome day",
    likes: 0,
    likers: {}
  },
  {
    id: 4,
    name: "Prashastha Mudannayake",
    avatar: "https://miro.medium.com/fit/c/256/256/0*rfrBJGvo5FXftsTx.",
    image: "https://picsum.photos/300/600",
    description: "This was a great thing they did",
    likes: 0,
    likers: {}
  },
  {
    id: 5,
    name: "Steve Jobs",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg",
    image: "https://picsum.photos/300/600",
    description: "Yay that was awesome",
    likes: 0,
    likers: {}
  },
  {
    id: 6,
    name: "Gotabhaya Rajapakse",
    avatar:
      "https://www.tamilguardian.com/sites/default/files/Image/pictures/2019/MAy%2018/Gotabaya%20Rajapaksa.jpg",
    image: "https://picsum.photos/300/600",
    description: "Enna rata dinawamu",
    likes: 0,
    likers: {}
  },
  {
    id: 7,
    name: "Prashastha Mudannayake",
    avatar: "https://miro.medium.com/fit/c/256/256/0*rfrBJGvo5FXftsTx.",
    image: "https://picsum.photos/300/600",
    description: "Elama thama...",
    likes: 0,
    likers: {}
  },
  {
    id: 8,
    name: "Steve Jobs",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg",
    image: "https://picsum.photos/300/600",
    description: "Great click ;)",
    likes: 0,
    likers: {}
  },
  {
    id: 9,
    name: "Gotabhaya Rajapakse",
    avatar:
      "https://www.tamilguardian.com/sites/default/files/Image/pictures/2019/MAy%2018/Gotabaya%20Rajapaksa.jpg",
    image: "https://picsum.photos/300/600",
    description:
      "It is important to develop the education system to cater the economy",
    likes: 0,
    likers: {}
  }
];

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
    Width: 400,
    Width: 300,
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
