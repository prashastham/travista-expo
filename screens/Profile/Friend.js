import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default class Friend extends Component {

  static navigationOptions = {
    title:'Friends',
    headerTintColor: Colors.stackHeaderTintColor,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Friend </Text>
      </View>
    );
  }
}


