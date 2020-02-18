import React, { useReducer, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as authActions from "../../redux/action/auth";

import firebase from "../../local/FirebaseClient";
import Storage from "../../local/Storage";

// const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// const formReducer = (state, action) => {
//   if (action.type === FORM_INPUT_UPDATE) {
//     const updateValues = {
//       ...state.inputValues,
//       [action.input]: action.value
//     };

//     const updatedValidities = {
//       ...state.inputValidities,
//       [action.input]: action.isValid
//     };

//     let updatedFormIsValid = true;
//     for (const key in updatedValidities) {
//       updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
//     }
//     return {
//       formIsValid: updatedFormIsValid,
//       inputValidities: updatedValidities,
//       inputValues: updateValues
//     };
//   }
//   return state;
// };

const SignupScreen = props => {
  const [email, updateEmail] = React.useState("");
  const [name, updateName] = useState("");
  const [telephone, updateTelephone] = useState("");
  const [password, updatePassword] = useState("");
  const [conf_password, updateConfPassword] = useState("");
  const [errormsg, setError] = useState(null);
  const [errorName, setErrorName] = useState(null);
  const [errortele, setErrortele] = useState(null);
  const [loading, setLoading] = useState(false)

  const validate = () => {
    setErrorName("");
    setErrortele("");
    if (name !== "") {
      if (telephone !== '' && telephone.length == 10) {
        return true;
      }
      else if (telephone == "") {
        setErrortele('Enter telephone number');
        alert('Enter telephone number');
        return false;
      }
      else {
        setError('Telephone number have only 10 digits');
        alert('Telephone number have only 10 digits')
        return false;
      }
    }
    else {
      setErrorName('Enter Name');
      alert('Enter Name');
      return false;
    }
  }

  const handleSignUp = () => {
    console.log(email + name + telephone);
    if (!validate()) {
      return false;
    }
    setLoading(true);
    if (password == conf_password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          user.user.updateProfile({ displayName: name }).then(() => {
            user.user.sendEmailVerification();
            Storage.setItem("accessToken", user.user.uid);
            createUser(user.user.uid);
          });
        })
        .catch(errormsg => { setLoading(false); setError(errormsg.message); alert(errormsg) });
    } else {
      setLoading(false);
      setError("Password do not match");
      alert(errormsg);
    }
  };

  const createUser = accessToken => {
    console.log(accessToken);
    const data = {
      email: email,
      name: name,
      telenumber: telephone,
      accessToken: accessToken,
      dpurl: ""
    };
    const url =
      "https://us-central1-travista-chat.cloudfunctions.net/app/api_app/createuser";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        Object.entries(res).forEach(([key, value]) => {
          console.log(`${key} ${value}`);
          Storage.setItem(key, value);
        });
        setLoading(false);
      })
      .catch(error => {
        console.log(
          "There is some problem in your fetch operation" + error.message
        );
        setLoading(false);
        if (error.message === "Network request failed") {
          alert("Check Your Connection.");
        }
      });
  };
  // const dispatch = useDispatch();

  // const [formState, dispatchFormState] = useReducer(formReducer, {
  //   inputValues: {
  //     email: "",
  //     password: "",
  //     conf_password: ""
  //   },
  //   inputValidities: {
  //     email: false,
  //     password: false,
  //     conf_password: false
  //   },
  //   formIsValid: false
  // });

  // const signupHandler = () => {
  //   dispatch(
  //     authActions.signup(
  //       formState.inputValues.email,
  //       formState.inputValues.password
  //     )
  //   );
  // };

  //used to store values of onInputChange of the Inputs
  // const inputChangeHandler = useCallback(
  //   (inputIdentifier, inputValue, inputValidity) => {
  //     dispatchFormState({
  //       type: FORM_INPUT_UPDATE,
  //       value: inputValue,
  //       isValid: inputValidity,
  //       input: inputIdentifier
  //     });
  //   },
  //   [dispatchFormState]
  // );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size='large' color='#c6c6c6' />
      </View>
    );
  }
  else {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <ScrollView>
          <View>
            {errormsg && (
              <View style={styles.errorMsg}>
                <Text style={styles.error}>{errormsg}</Text>
              </View>
            )}
            <View style={styles.inputContainer}>
              <Input
                id="name"
                label="Your Name"
                placeholder="Frist name Last name"
                leftIcon={{
                  type: "material",
                  name: "person",
                  color: "#ccc",
                  padding: 5
                }}
                required
                errorMessage={errorName}
                errorStyle={{ color: 'red' }}
                autoCapitalize="none"
                onChangeText={text => updateName(text)}
                value={name}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                id="telephone"
                label="Your Telephone"
                placeholder="071 000 000 1"
                leftIcon={{
                  type: "material",
                  name: "phone",
                  color: "#ccc",
                  padding: 5
                }}
                required
                errorMessage={errortele}
                errorStyle={{ color: 'red' }}
                autoCapitalize="none"
                onChangeText={text => updateTelephone(text)}
                value={telephone}
              />
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
                autoCapitalize="none"
                required
                minLength={6}
                onChangeText={text => updatePassword(text)}
                value={password}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                id="conf_password"
                label="Re-Type Password"
                keyboardType="default"
                secureTextEntry
                placeholder="password"
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "#ccc",
                  padding: 5
                }}
                autoCapitalize="none"
                required
                minLength={6}
                onChangeText={text => updateConfPassword(text)}
                value={conf_password}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Sign Up" type="outline" onPress={handleSignUp} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              icon={
                <Icon name="arrow-left" size={15} color="white" padding={5} />
              }
              iconLeft
              title="  Already got an account"
              onPress={() => props.navigation.navigate({ routeName: "Login" })}
            />
          </View>

          <View style={styles.buttonContainer}>
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
                Sign up with
            </Text>
              <Icon name="facebook-f" size={20} color="white" />
            </LinearGradient>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
};

SignupScreen.navigationOptions = {
  title: "Sign Up"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    maxHeight: Dimensions.get("screen").height
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
    textAlign: "center",
    justifyContent: "center"
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

export default SignupScreen;
