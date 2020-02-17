import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Button, Input, Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

import firebase from "../../local/FirebaseClient";
import Storage from "../../local/Storage";

const LoginScreen = props => {
  const [email, updateEmail] = React.useState("");
  const [password, updatePassword] = useState("");
  const [errormsg, setError] = useState(null);
  const [erroremail, setErroremail] = useState(null);
  const [errorpassword, setErrorpassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [emailAddress,setEmailAddress] = useState("")
  const [isOverlayVisible,setOverlay] = useState(false);
  const [error3,setErorr3] = useState("");

  const  validate = ()=>{
    setErroremail('');
    setErrorpassword('');
    if(email!=="")
    {
      if(password!=="" && password.length>=6)
      {
        return true;
      }
      else if(password=="")
      {
        setErrorpassword('Enter Password')
        return false;
      }
      else{
        setErrorpassword('Invalid Password')
        return false;
      }
    }
    else{
      setErroremail('Enter Email')
      return false;
    }
  }

  const handleLogin = () => {
    if(!validate())
    {
      return false;
    }
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
        Storage.setItem("accessToken", user.uid);
        getuserdata(user.uid);
      })
      .catch(error => {setLoading(false); setError(error.message)});
  };

  const getuserdata = (accessToken) =>{
    console.log(accessToken)
   
    const url = `https://us-central1-travista-chat.cloudfunctions.net/app/api/login?access=${accessToken}`
    fetch(url,{
      method:'GET',
      headers: { 
        'Accept': 'application/json',
         'Content-Type': 'application/json' 
      }
    })
    .then((res => res.json()))
    .then(res =>{
      Object.entries(res).forEach( async ([key, value]) => {
        console.log(`${key} ${value}`);
        await Storage.setItem(key, value)
        
      });
    })
    .catch(error=>{
      console.log('There is some problem in your fetch operation'+error.message)
      setLoading(false)
      if(error.message === 'Network request failed')
      {
        alert('Check Your Connection.')
      }
    })
      .then(res => res.json())
      .then(res => {
        Object.entries(res).forEach(([key, value]) => {
          console.log(`${key} ${value}`);
          Storage.setItem(key, value);
        });
      })
      .catch(error => {
        console.log(
          "There is some problem in your fetch operation" + error.message
        );
        if (error.message === "Network request failed") {
          alert("Check Your Connection.");
        }
      });
  };

  const  validateEmail = (email)=> {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const forgotPassword = () =>{
    if(!validateEmail(emailAddress))
    {
      setErorr3('email badly formatted.')
      return false
    }
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      setOverlay(false);
      alert('email send! check Your Email')
    }).catch(function(error) {
      setOverlay(false);
      alert('error to reset password!')
    });
    
  }

  if(isLoading)
  {
    return(
      <View style={styles.container}>
        <ActivityIndicator size='large' color = '#c6c6c6'/>
      </View>
    );
  }
  else
  {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView>
          {/* style={styles.container} */}
          <View style={styles.intro}>
            <ImageBackground
              source={require("../../assets/images/intro1.png")}
              style={styles.intro}
            >
              <Image
                style={{
                  width: Dimensions.get("window").width * 0.4,
                  height: Dimensions.get("window").width * 0.4
                }}
                source={require("../../assets/images/icon.png")}
              />
            </ImageBackground>
          </View>
          <View>
            <View style={styles.errorMsg}>
              {errormsg && <Text style={styles.error}>{errormsg}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <Input
                id="email"
                label="Your Email Address"
                keyboardType="email-address"
                placeholder="email@address.com"
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope-square",
                  color: "#ccc",
                  padding: 5
                }}
                errorMessage={erroremail}
                errorStyle={{color:'red'}}
                email
                required
                autoCapitalize="none"
                onChangeText={text => updateEmail(text)}
                value={email}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                placeholder="password"
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "#ccc",
                  padding: 5
                }}
                errorMessage={errorpassword}
                errorStyle={{color:'red'}}
                autoCapitalize="none"
                required
                minLength={6}
                onChangeText={text => updatePassword(text)}
                value={password}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Login" type="outline" onPress={handleLogin} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              icon={
                <Icon name="arrow-right" size={15} color="white" padding={5} />
              }
              iconRight
              title="Join Us"
              onPress={() => props.navigation.navigate({ routeName: "SignUp" })}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress = {()=>{setOverlay(true)}}>
            <LinearGradient
              colors={["#4c669f", "#3b5998", "#192f6a"]}
              style={{
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
                Forgot password
              </Text>
            </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Overlay
          isVisible={isOverlayVisible}
          windowBackgroundColor="rgba(0, 0, 0, 0.5)"
          overlayBackgroundColor="white"
          onBackdropPress={() => setOverlay(false)}
          width="90%"
          height="50%"
        >
          <View style={styles.overlayContainer}>
            <Input label='Your Email Address' errorStyle={{ color: 'red' }} errorMessage={error3} onChangeText={(text)=>setEmailAddress(text)} value={emailAddress}/>
            <Button title='Send' type='outline' buttonStyle={{borderWidth: 1,}} onPress={()=>forgotPassword()}/>
          </View>
        </Overlay>
      </KeyboardAvoidingView>
    );
  }
};

LoginScreen.navigationOptions = {
  title: "Login"
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
  },
  overlayContainer:{
    flex:1,
    justifyContent:'space-around'
  },
});

export default LoginScreen;
