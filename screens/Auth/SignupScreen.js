import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

const SignupScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
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
              errorStyle={{ color: "#fb4c19" }}
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
              errorStyle={{ color: "#fb4c19" }}
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
              errorStyle={{ color: "#fb4c19" }}
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
    </SafeAreaView>
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
    maxHeight: Dimensions.get("screen").height
  },
  buttonContainer: {
    padding: 25,
    width: 300,
    minWidth: "90%"
  },
  inputContainer: {
    padding: 25,
    width: 300,
    minWidth: "90%"
  }
});

export default SignupScreen;
