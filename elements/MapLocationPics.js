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
import moment from 'moment';

// import dummy_posts from "../dummy_data/dummy_posts";
// const posts = dummy_posts;

const MapLocationPics = props => {
  const [date, setDate] = useState("");
  const [region, setRegion] = useState(props.region)
  const [posts, setPost] = useState([]);
  const [status, setStatus] = useState('')

  const loadData = () => {
    console.log(region)
    lat = region.latitude.toString();//'6.8612775'
    long = region.longitude.toString();//'79.892156'
    console.log(lat + " " + long);
    url = 'https://us-central1-travista-chat.cloudfunctions.net/app/api_app/getlocpics/?lat=' + lat + '&long=' + long;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        setPost(res);
      })
      .catch(error => {
        console.log(
          "There is some problem in your fetch operation" + error.message
        );
        if (error.message === "Network request failed") {
          alert("Connection faild. Try again later.");
        }
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  if (posts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <Text>No Data Found</Text>
      </View>
    );
  }
  else {
    return (

      <ScrollView style={styles.container} scrollEnabled horizontal={true}>
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
                      title={u.userHandle.charAt(0).toLocaleUpperCase()}
                      source={{ uri: u.dpurl ? u.dpurl : " " }}
                      rounded
                      PlaceholderContent={<ActivityIndicator />}
                    />
                  </View>
                  <View style={styles.user}>
                    <Text style={styles.user}>{u.userHandle}</Text>
                    <Text style={styles.date}>{moment(u.createdAt).format("YYYY-MM-DD h:mm")}</Text>
                  </View>
                </View>
              }
            >
              <View>
                <Text style={styles.description}>{u.description}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: u.image }}
                  style={{
                    flexGrow: 1,
                    maxHeight: Dimensions.get("window").height * 0.4,
                    height: Dimensions.get("window").height * 0.4
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
            </Card>
          );
        })}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get("screen").width,
  },
  postContainer: {
    marginHorizontal: 5,
    borderRadius: 5,
    width: Dimensions.get("screen").width,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
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
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#af4',
  }
});

export default MapLocationPics;
