import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card, Button, Avatar } from "react-native-elements";

const users = [
  {
    name: "brynn",
    avatar: "https://miro.medium.com/fit/c/256/256/0*rfrBJGvo5FXftsTx."
  },
  {
    name: "brynn",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  },
  {
    name: "brynn",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  }
];

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      {users.map((u, i) => {
        return (
          <Card key={i} title={u.name}>
            <View style={styles.user}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: u.avatar }}
              />
              <Text style={styles.name}>{u.name}</Text>
            </View>
          </Card>
        );
      })}
    </View>
  );
};

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HomeScreen;
