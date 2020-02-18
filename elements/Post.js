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

const Post = props => {
  const [date, setDate] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [userId, setUserId] = useState(props.userId);

  const loadData = async () => {
    setLoading(true);
    console.log(userId)
    url = 'https://asia-east2-travista-chat.cloudfunctions.net/app2/postswithid/' + userId;

    await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then( async res => await res.json())
      .then( res => {
        console.log(res);
        setPosts(res);
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
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
  }, [userId]);

  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size='large' color='#000' />
      </View>
    );
  }
  else {
    if (posts.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style = {styles.emptyText}>Nothing to Show</Text>
        </View>
      );
    }
    else {
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
              </Card>
            );
          })}
        </ScrollView>
      );
    }
  }
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  emptyText:{
    width:'100%',
    fontSize:20,
    fontWeight:'500',
    textAlign:'center',
    paddingVertical:10,
    color:'#c6c6c6'
  },
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
