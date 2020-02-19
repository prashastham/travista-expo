import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Image
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
import HeaderIcon from "../../components/HeaderIcon";

import Storage from "../../local/Storage";
import { LinearGradient } from "expo-linear-gradient";

import DatePicker from "react-native-datepicker";
import { TouchableOpacity } from "react-native-gesture-handler";

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

// openChat = props => {
//   props.navigation.navigate("Chat");
// };

const CreateEvent = props => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dpurl, setDpurl] = useState("");

  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    this._retrieveData();
    this._getCurrentDate();
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

  _getCurrentDate = () => {
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    setDate(date);
  };

  submit = props => {
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/event/`;
    const newEvent = {
      author: id,
      dpurl: dpurl,
      body: msg,
      userHandle: name,
      date: date,
      location: location
    };
    if (newEvent.location !== "" && newEvent.date !== "") {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
      }).then(res => console.log(res));
      _getCurrentDate();
      setLocation("");
      setMsg("");
    } else {
      alert("Invalid event");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView>
        {/* style={styles.container} */}
        <View style={styles.intro}>
          <ImageBackground
            source={require("../../assets/images/landscape.jpg")}
            style={styles.intro}
          ></ImageBackground>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Input
              id="msg"
              label="Message"
              keyboardType="default"
              placeholder="Enter message"
              leftIcon={{
                type: "font-awesome",
                name: "sticky-note",
                color: "#ccc",
                padding: 5
              }}
              required
              autoCapitalize="none"
              onChangeText={text => setMsg(text)}
              value={msg}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              id="location"
              label="location"
              keyboardType="default"
              placeholder="Add location"
              leftIcon={{
                type: "font-awesome",
                name: "flag",
                color: "#ccc",
                padding: 5
              }}
              autoCapitalize="none"
              required
              onChangeText={text => setLocation(text)}
              value={location}
            />
          </View>

          <View style={styles.inputContainer}>
            <DatePicker
              style={{ width: 200 }}
              date={date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-2020"
              maxDate="01-01-2021"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={date => {
                setDate(date);
              }}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              submit(props);
            }}
          >
            <LinearGradient
              colors={["#4c669f", "#3b5998", "#192f6a"]}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                padding: 5,
                alignItems: "center",
                borderRadius: 5
              }}
            >
              <Text
                style={{
                  backgroundColor: "transparent",
                  fontSize: 20,
                  color: "#fff",
                  padding: 5
                }}
              >
                Create Event
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

CreateEvent.navigationOptions = {
  title: "New Event",
  headerTintColor: Colors.stackHeaderTintColor,
  headerLeft: <HeaderIcon />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width
  },
  intro: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    minWidth: "95%",
    minHeight: Dimensions.get("window").height * 0.4
  },
  errorMsg: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    fontSize: 13,
    fontWeight: "600",
    color: "red",
    textAlign: "center"
  },
  buttonContainer: {
    padding: 10,
    minWidth: "100%"
  },
  inputContainer: {
    padding: 25,
    minWidth: "100%"
  }
});

export default CreateEvent;

// <View>

//         </View>
