import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import firebase from '../../local/FirebaseClient';

export default class VerifyScreen extends Component {
    static navigationOption = {
        header:'none'
    }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  sendVerification()
  {
    const user = firebase.auth().currentUser;
    user.sendEmailVerification();
  }
  goback=(props)=>{
    this.props.navigation.navigate('Auth')
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sub_container_1}>
          <Image
            style={styles.verify_image}
            source={require('../../assets/images/email_verify.jpg')}
          />
          <Text style={styles.text}> We send Verification link to your email....!</Text>
          <Button
          title='Resend Verification'
          type='outline'
          raised={true}
          containerStyle={styles.sendButtonContainer}
          buttonStyle={styles.sendButton}
          onPress={this.sendVerification}
          />
          <Button
          title='Go Back'
          type='outline'
          raised={true}
          containerStyle={styles.sendButtonContainer}
          buttonStyle={styles.sendButton}
          onPress={() => {this.goback()}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  sub_container_1:{
    flexGrow: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  verify_image:{
    width: 150,
    height: 150
  },
  text:{
    fontSize:20,
    color:'#0cf',
    justifyContent:'center',
    textAlign:'center',
  },
  sendButton:{
    width:200,
  },
  sendButtonContainer:{
    margin:20,
  },
})