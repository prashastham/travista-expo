import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class CreatePost extends Component {
  static navigationOptions = {
      title:'Make a Memory'
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> CreatePost </Text>
      </View>
    );
  }
}
