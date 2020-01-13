import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Card, Button, Avatar, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";

import dummy_posts from "../dummy_data/dummy_posts";
const posts = dummy_posts;

export default class Review extends Component{

    constructor(props){
        super(props);
    }
    state = {
        data : this.props.review,
    }
    render(){
    return (
    
        <ScrollView style={styles.container} contentOffset={{ x: 10, y: 10 }}> 
          {this.state.data.map((review, i) => {
              const createdAt = review.createdAt.split('T');
              const date = createdAt[0]
              const longTime = createdAt[1].split(':')
              const time = longTime[0]+':'+longTime[1]
            return (
              <Card
                containerStyle={styles.postContainer}
                key={i}
                title={
                  <View style={styles.header}>
                    <View style={styles.headerUser}>
                        <View style={styles.avatar}>
                            <Avatar
                                size="small"
                                source={{ uri: review.traverlerImageUrl }}
                                rounded
                                PlaceholderContent={<ActivityIndicator />}
                            />
                        </View>
                        <View style={styles.user}>
                            <Text style={styles.user}>{review.travelerId}</Text>
                        </View>
                    </View>
                    <Text style={styles.date}>{date} {time}</Text>
                  </View>
                }
              >
                <View>
                  <Text style={styles.description}>{review.body}</Text>
                </View>
              </Card>
            );
          })}
        </ScrollView>
      );
  }
  
};

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get("screen").width,
  },
  postContainer: {
    marginHorizontal:5,
    borderRadius: 5,
  },
  header: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems:'baseline'
  },
  headerUser:{
    flexDirection: "row",
    justifyContent: "center"
  },
  user: {
    justifyContent:'center',
    fontSize: 16,
    fontWeight: "500"
  },
  date: {
    marginLeft: 5,
    color: "#ccc",
    fontWeight: "500"
  },
  avatar: {
    padding: 5,
    marginRight:5,
  },
  description: {
    padding: 10
  },
  imageContainer:{
    // backgroundColor:'#f00',
    paddingVertical:10,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderTopColor:'#af4',
    borderBottomColor:'#af4',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

