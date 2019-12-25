import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import { Button , Overlay, Input} from 'react-native-elements';

export default class EditProfile extends Component {

  static navigationOptions = {
      title:'Edit Profile',
      headerTintColor:Colors.stackHeaderTintColor,
  }

  current_data = this.props.navigation.state.params
  constructor(props) {
    super(props);
    this.state = {
      accessToken:this.current_data.id,
      name:this.current_data.name,
      email:this.current_data.email,
      hometown:this.current_data.hometown,
      from:this.current_data.from,
      country:this.current_data.country,
      interest:this.current_data.interest,
      worksin:this.current_data.worksin,
      telenumber:this.current_data.telenumber,
      bio:this.current_data.bio,
      loading:false
    };
    
  }

  goback=(props)=>{
    this.props.navigation.goBack()
  }

  save(){
    this.setState({loading:true});
    const url = 'https://us-central1-travista-chat.cloudfunctions.net/app/api_app/profileupdate'
    const data = {
      accessToken:this.state.accessToken,
      name:this.state.name,
      email:this.state.email,
      hometown:this.state.hometown,
      from:this.state.from,
      country:this.state.country,
      interest:this.state.interest,
      worksin:this.state.worksin,
      telenumber:this.state.telenumber,
      bio:this.state.bio,
    }
    console.log(data)
    fetch(url,{
      method:'POST',
      headers: { 
        'Accept': 'application/json',
         'Content-Type': 'application/json' 
      },
      body:JSON.stringify(data)
    })
    .then((res => res.json()))
    .then(res =>{
      console.log(res)
      this.setState({loading:false});
      this.goback();
    })
    .catch(error=>{
      console.log('There is some problem in your fetch operation'+error.message)
      if(error.message === 'Network request failed')
      {
        Alert.alert(
          '',
          'Connection faild. Try again later.',
          [
            {text: 'OK', onPress: () => {this.goback()}},
          ],
          {cancelable: false},
        );
      }
    })
  }

  render() {
    if(this.state.loading) {
    return(
      <ActivityIndicator
        size={"large"}
        style={styles.activityIndicator}
      />
    )
    }
    else{
    return (
      <ScrollView>
        <View style={styles.saveContainer}>
          <Text>Save Your Changes</Text>
          <Button
            title='Save'
            type='outline'
            raised={true}
            buttonStyle={styles.saveButton}
            onPress={this.save.bind(this)}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='Name :'
            value={this.state.name}
            leftIcon={{ type: 'material', name: 'account-circle', containerStyle:{marginRight:10} }}
            onChangeText={text => this.setState({name:text})}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='E-Mail :'
            value={this.state.email}
            leftIcon={{ type: 'material', name: 'email', containerStyle:{marginRight:10} }}
            onChangeText={text => this.setState({email:text})}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='Hometown :'
            value={this.state.hometown}
            leftIcon={{ type: 'material', name: 'room', containerStyle:{marginRight:10} }}
            onChangeText={text => this.setState({hometown:text})}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='From :'
            value={this.state.from}
            leftIcon={{ type: 'material', name: 'room', containerStyle:{marginRight:10} }}
            onChangeText={text => this.setState({from:text})}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='Country :'
            value={this.state.country}
            leftIcon={{ type: 'material', name: 'room', containerStyle:{marginRight:10} }}
            onChangeText={text => this.setState({country:text})}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='Interest :'
            value={this.state.interest}
            leftIcon={{ type: 'material', name: 'pool', containerStyle:{marginRight:10} }}
            onChangeText={text => this.setState({interest:text})}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='Worksin :'
            value={this.state.worksin}
            leftIcon={{ type: 'material', name: 'work', containerStyle:{marginRight:10} }}
            onChangeText={text => this.setState({worksin:text})}
          />
        </View>   
        <View style={styles.editField}>
          <Input
            label='Telenumber :'
            value={this.state.telenumber}
            leftIcon={{ type: 'material', name: 'phone', containerStyle:{marginRight:10} }}
            onChangeText={text => this.setState({telenumber:text})}
          />
        </View> 
        <View style={styles.editField}>
          <Input
            label='Bio :'
            value={this.state.bio}
            leftIcon={{ type: 'material', name: 'assignment', containerStyle:{marginRight:10} }}
            onChangeText={text => this.setState({bio:text})}
          />
        </View> 
      </ScrollView>
    );
    }
  }
}

const styles = StyleSheet.create({
  saveContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom:20,
  },
  saveButton:{
    width:70,
  },
  editField:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  editLable:{
    fontSize:17,
    paddingLeft:10
  },
  editInput:{

  },
  activityIndicator:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})