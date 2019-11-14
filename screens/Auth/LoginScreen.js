import React from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
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
          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              type="outline"
              onPress={() => props.navigation.navigate({ routeName: "App" })}
            />
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
              Sign in with
            </Text>
            <Icon name="facebook-f" size={20} color="white" />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  buttonContainer: {
    padding: 10,
    widht: 300,
    minWidth: "90%"
  },
  inputContainer: {
    padding: 25,
    width: 300,
    minWidth: "90%"
  }
});

export default LoginScreen;
