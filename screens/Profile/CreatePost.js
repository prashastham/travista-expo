import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Button} from 'react-native-elements';

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
        <Button
            title='Other'
            type='outline'
            raised={true}
            buttonStyle={{width:100,}}
            onPress={()=>this.props.navigation.navigate('ServiceProfile',{accessToken:'4LSlL7BsdseSkIKi8BKGrVdTIE22'})}
          />
           <Button
            title='Service filter'
            type='outline'
            raised={true}
            buttonStyle={{width:100,}}
            onPress={()=>this.props.navigation.navigate('ServiceFilter')}
          />
      </View>
    );
  }
}
