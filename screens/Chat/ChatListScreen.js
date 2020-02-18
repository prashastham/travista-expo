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
import { Card, Button, ListItem } from "react-native-elements";
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

openChat = (props, eventId) => {
  props.navigation.navigate("Chat", { id: eventId });
};

const ChatListScreen = props => {
  const [name, setName] = useState("");
  const [dpurl, setDpurl] = useState("");
  const [id, setId] = useState("");

  const [eventList, setEventList] = useState([
    {
      eventId: "14zciD5n98Fh9F4cOLK0",
      date: "30-12-2020",
      createdAt: "2020-02-18T02:31:23.784Z",
      location: "Kaluthara",
      userHandle: "Prashastha Mudannayake",
      author: "U4amdy2T05UfFBNVdeCHB8Fpdii1",
      dpurl:
        "https://firebasestorage.googleapis.com/v0/b/travista-chat.appspot.com/o/users%2FU4amdy2T05UfFBNVdeCHB8Fpdii1%2Fdp.jpg?alt=media&token=30ba2d67-f831-41ad-b55c-cb8a7e255389",
      body: "testing event"
    }
  ]);

  useEffect(() => {
    this._retrieveData();
    getEvents();
  }, []);

  _retrieveData = async () => {
    try {
      let id = await Storage.getItem("accessToken");
      let dpurl = await Storage.getItem("dpurl");
      let name = await Storage.getItem("name");

      if ((dpurl && name) !== null) {
        // We have data!!
        setId(id);
        setDpurl(dpurl);
        setName(name);
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };

  getEvents = () => {
    const url =
      "https://asia-east2-travista-chat.cloudfunctions.net/app2/events";
    fetch(url)
      .then(res => res.json())
      .then(function(data) {
        setEventList(data);
        //console.log(eventList);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  return (
    <View>
      {eventList.map((l, i) => (
        <TouchableOpacity onPress={() => openChat(props, l.eventId)}>
          <ListItem
            key={i}
            leftAvatar={{ source: { uri: l.dpurl } }}
            title={
              <View style={{ flexDirection: "row" }}>
                <Text>{l.userHandle}</Text>
                <Text>'s to </Text>
                <Text>{l.location}</Text>
              </View>
            }
            subtitle={l.date}
            bottomDivider
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

ChatListScreen.navigationOptions = {
  title: "Events",
  headerTintColor: Colors.stackHeaderTintColor,
  headerLeft: <HeaderIcon />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: Dimensions.get("screen").width
  }
});

export default ChatListScreen;

// <View style={styles.container}>
//       {<Button onPress={() => openChat(props)} title="open chat" />}
//       {eventList.map((u, i) => {
//         console.log(i);
//         console.log(u);
//         <Text>{u.dpurl}</Text>;
//         <ListItem
//           key={i}
//           leftAvatar={{ source: { uri: u.dpurl } }}
//           title={u.userHandle}
//           subtitle={u.date}
//           bottomDivider
//         />;
//       })}
//     </View>
