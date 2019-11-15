import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class HeaderIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Image
            source={require('../assets/images/icon.png')}
            style={{width: 40, height: 40, marginLeft: 15}}
        />
      </View>
    );
  }
}
