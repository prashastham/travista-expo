import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList
} from "react-native";
import firebase from '../local/FirebaseClient';
import Storage from '../local/Storage';
import Colors from "../constants/Colors";
import HeaderIcon  from '../components/HeaderIcon';

const Logout = props =>{
  firebase.auth().signOut()
  .then(async ()=>{
    tkm = await Storage.getItem('accessToken')
    console.log(tkm)
    Storage.clear()
    tk = await Storage.getItem('accessToken')
    console.log(tk)
    props.navigation.navigate({ routeName: "Loading" })
  })
  .catch(error=>{console.log(error)})
}

const SettingsScreen = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => Logout(props)}
      >
        <View style={styles.textList}>
          <Text style={{ fontSize: 16 }}>Logout</Text>
        </View>
      </TouchableOpacity>
      <View>
          <Button title='Change Password'/>
      </View>
      <View>
          <Button title='Services'/>
      </View>
      <View>
          <Button title='Logout'/>
      </View>

    </View>
  );
};

SettingsScreen.navigationOptions = {
  title: "Settings",
  headerTintColor:Colors.stackHeaderTintColor,
  headerLeft:<HeaderIcon/>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textList: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "grey",
    borderColor: "black",
    borderWidth: 1
  }
});

export default SettingsScreen;
