import React from "react";
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

const SignupScreen = props => {
  // const dispatch = useDispatch();

  // const signupHandler = () =>{
  //   dispatch(authActions.signup);
  // };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <ScrollView>
        <View>
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
              errorMessage="Enter valid E-Mail address"
              errorStyle={Colors.errorText}
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
              errorMessage="Enter valid password"
              errorStyle={Colors.errorText}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              id="password"
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
              errorMessage="Enter valid password"
              errorStyle={Colors.errorText}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Sign Up"
              type="outline"
              onPress={() => props.navigation.navigate({ routeName: "App" })}
            />
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
  title: "Sign"
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
  buttonContainer: {
    padding: 10,
    minWidth: "90%"
  },
  inputContainer: {
    padding: 25,
    width: 300,
    minWidth: "100%"
  }
});

export default SignupScreen;
