import React,{useState} from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator
} from "react-native";
// import firebase from '../local/FirebaseClient';
import firebase from 'firebase';
import Storage from '../local/Storage';
import Colors from "../constants/Colors";
import HeaderIcon  from '../components/HeaderIcon';
import {Button, Overlay, Input} from 'react-native-elements';

const Logout = props =>{
  firebase.auth().signOut()
  .then(async ()=>{
    Storage.clear()
    props.navigation.navigate({ routeName: "Loading" })
  })
  .catch(error=>{console.log(error)})
}
const SettingsScreen = props => {

  const [password, onChangePassword] = useState("");
  const [newPassword, onChangeNewPassword] = useState("");
  const [confirmPassword, onChangeconfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isOverlayVisible,setOverlay] = useState(false);
  const [error1,setError1] = useState("");
  const [error2,setError2] = useState("");
  const [error3,setError3] = useState("");

  const Validate = () =>{
    setError1("")
    setError2("")
    setError3("")
    if(password!=="" && password.length>=6)
    {
        if(newPassword!=="" && newPassword.length>=6)
        {
            if(confirmPassword!=="" && confirmPassword.length>=6)
            {
              return true;
            }
            else if(confirmPassword.length<6)
            {
              setError3("Password must have at least 6 characters")
              return false
            }
            else{
              setError3("Can't be Empty")
              return false;
            }
        }
        else if(newPassword.length<6)
        {
          setError2("Password must have at least 6 characters")
          return false
        }
        else{
          setError2("Can't be Empty")
          return false;
        }
    }
    else if(password.length<6)
    {
      setError1("Password must have at least 6 characters")
      return false
    }
    else{
      setError1("Can't be Empty")
      return false;
    }
  }

  const ChangePassword = () =>{
    setLoading(true)
    setOverlay(false)
    if(!Validate())
    {
      console.log('ok')
      return false;
    }
    if(newPassword!==confirmPassword)
    {
      alert('password not match');
      onChangeNewPassword("");
      onChangeconfirmPassword("");
      setError2("Must be same")
      setError2("Must be same")
      return false;
    }
    var user = firebase.auth().currentUser;

    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    user
    .reauthenticateWithCredential(credential)
    .then(() => {
      // User re-authenticated.
      user
        .updatePassword(newPassword)
        .then(() => {
          // Update successful.
          setLoading(false);
          onChangePassword("");
          onChangeNewPassword("");
          onChangeconfirmPassword("");
          alert('Update Successfull!')
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          onChangePassword("");
          onChangeNewPassword("");
          onChangeconfirmPassword("");
          alert('Invalid Password. Please try again!')
        });
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      onChangePassword("");
      onChangeNewPassword("");
      onChangeconfirmPassword("");
      alert('Invalid Password. Please try again!')
    });
  }
  if(isLoading)
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
        <ActivityIndicator size='large' color='#c6c6c6'/>
      </View>
    );
  }
  else{
  return (
    <View style={styles.container}>
          <Button title='Change Password'  type = 'outline' buttonStyle={styles.buttonStyle} onPress={() => setOverlay(true)}/>
          <Button title='Logout' type = 'outline' buttonStyle={{width:Dimensions.get('window').width*0.9,marginTop:20,borderColor:'#f00'}} titleStyle={{color:'#f00'}} onPress={() => Logout(props)}/>
          <Overlay
                isVisible={isOverlayVisible}
                windowBackgroundColor="rgba(0, 0, 0, 0.5)"
                overlayBackgroundColor="white"
                onBackdropPress={() => setOverlay(false)}
                width="90%"
                height="80%"
            >
                <View style={styles.overlayContainer}>
                  <Input label='Current Password'errorStyle={{ color: 'red' }} errorMessage={error1} onChangeText={(text)=>onChangePassword(text)} value={password} secureTextEntry={true}/>
                  <Input label='New Password' errorStyle={{ color: 'red' }} errorMessage={error2} onChangeText={(text)=>onChangeNewPassword(text)} value={newPassword} secureTextEntry={true}/>
                  <Input label='Confirm New Password' errorStyle={{ color: 'red' }} errorMessage={error3} onChangeText={(text)=>onChangeconfirmPassword(text)} value={confirmPassword} secureTextEntry={true}/>
                  <Button title='Save' type='outline' buttonStyle={{borderWidth: 1,}} onPress={()=>ChangePassword()}/>
                </View>
            </Overlay>
    </View>
    
  );
  }
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
    justifyContent: "flex-start",
    marginHorizontal:10,
    alignItems: "center"
  },
  buttonStyle:{
    marginTop:20,
   width:Dimensions.get('window').width*0.9,
  },
  overlayContainer:{
    flex:1,
    justifyContent:'space-around'
  },
});

export default SettingsScreen;
