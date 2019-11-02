import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from '../../constants/Colors';

export default class EditProfile extends Component {

  static navigationOptions = {
      title:'Edit Profile',
      headerTintColor:Colors.stackHeaderTintColor,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> EditProfile </Text>
      </View>
    );
  }
}
