import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
import HeaderIcon from "../../components/HeaderIcon";

import firebaseClient from "../../local/FirebaseClient";

import Storage from "../../local/Storage";
import { ScrollView } from "react-native-gesture-handler";
closeChat = props => {
  props.navigation.goBack();
};

const ChatScreen = props => {
  const [msg, setMsg] = useState("");

  //const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dpurl, setDpurl] = useState("");

  const [msgList, setMsgList] = useState([]);
  //const [eventId, setEventId] = useState("");

  useEffect(() => {
    this._retrieveData();
    const { params } = props.navigation.state;
    const id = params.id;
    this._getMessages();
  }, []);

  _retrieveData = async () => {
    try {
      //let id = await Storage.getItem("accessToken");
      let dpurl = await Storage.getItem("dpurl");
      let name = await Storage.getItem("name");

      if ((dpurl && name) !== null) {
        // We have data!!
        //setId(id);
        setDpurl(dpurl);
        setName(name);
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };

  //saving a message
  function sendMsg() {
    //upload into database
    var message = {
      userHandle: name,
      dpurl: dpurl,
      createdAt: new Date().toISOString(),
      body: msg
    };
    if (message.body !== "") {
      var keyVal = firebaseClient
        .database()
        .ref()
        .child("messages")
        .push().key;

      var updates = {};
      const { params } = props.navigation.state;
      const id = params.id;

      updates["/messages/" + id + "/" + keyVal] = message; //eventId here
      return firebaseClient
        .database()
        .ref()
        .update(updates);
    }
  }

  //retieving messages
  _getMessages = () => {
    const { params } = props.navigation.state;
    const id = params.id;
    firebaseClient
      .database()
      .ref("/messages/" + id) //eventId here
      .on("value", function(snapshot) {
        snapshotToArray(snapshot);
        console.log("snapshot", snapshot);
      });
  };

  snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    setMsgList(returnArr);
    //console.log("new message list", returnArr);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={65}
      enabled
    >
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Write a message..."
            underlineColorAndroid="transparent"
            onChangeText={msg => setMsg(msg)}
            value={msg}
            multiline
            maxLength={100}
          />
        </View>

        <TouchableOpacity
          style={styles.btnSend}
          onPress={() => {
            if (msg != "") {
              sendMsg();
              setMsg("");
            } else {
              alert("Empty message");
            }
          }}
        >
          <Icon name="arrow-circle-right" size={40} color="#f2f3f4" />
        </TouchableOpacity>
      </View>
      <View style={styles.chatAndButton}>
        <Button
          icon={
            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
              <Icon name="window-close" size={20} color="black" />
            </View>
          }
          type="clear"
          iconRight
          onPress={() => closeChat(props)}
        />
        <ScrollView
          style={styles.chat}
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          {msgList.map((l, i) =>
            l.userHandle == name ? (
              <View
                style={{
                  padding: 5,
                  maxWidth: Dimensions.get("screen").width,
                  borderRadius: 5
                }}
              >
                <ListItem
                  key={i}
                  subtitle={
                    <View style={{ flexDirection: "row-reverse" }}>
                      <Text style={{ fontSize: 20 }}>{l.body}</Text>
                    </View>
                  }
                  bottomDivider
                />
              </View>
            ) : (
              <View
                style={{
                  padding: 5,
                  maxWidth: Dimensions.get("screen").width * 0.8
                }}
              >
                <ListItem
                  key={i}
                  leftAvatar={{ source: { uri: l.dpurl } }}
                  title={
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 20, color: "#28b463" }}>
                        {l.userHandle}
                      </Text>
                    </View>
                  }
                  subtitle={
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 20 }}>{l.body}</Text>
                    </View>
                  }
                  bottomDivider
                />
              </View>
            )
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

ChatScreen.navigationOptions = {
  title: "Chat",
  headerTintColor: Colors.stackHeaderTintColor,
  headerLeft: <HeaderIcon />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    minWidth: Dimensions.get("screen").width,
    backgroundColor: "#fbeee6"
  },
  chatAndButton: {
    flex: 1,
    flexDirection: "column"
  },
  chat: {
    flex: 1
  },
  footer: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10,
    padding: 5
  },
  btnSend: {
    backgroundColor: "#28b463",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center"
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  }
});

export default ChatScreen;
