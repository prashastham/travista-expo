import React, { useReducer, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as authActions from "../../redux/action/auth";

import firebase from "../../local/FirebaseClient";
import Storage from '../../local/Storage';

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
  const [password, updatePassword] = useState("");
  const [conf_password, updateConfPassword] = useState("");
  const [errormsg, setError] = useState(null);

  const handleSignUp = () => {
    if (password == conf_password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user=>{Storage.setItem("accessToken", user.uid)})
        .catch(errormsg => setError(errormsg.message));
    } else {
      setError("Password do not match");
    }
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

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <ScrollView>
        <View>
          {errormsg && 
            <View style={styles.errorMsg}>
              <Text style={styles.error}>{errormsg}</Text>
            </View>
          }
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
    justifyContent:'center'
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
