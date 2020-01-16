import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Storage from '../../local/Storage';
import { Avatar, Input, Button } from 'react-native-elements';
import moment from 'moment';

export default class AddReview extends Component {

    static navigationOptions = ({ navigation }) => {
      const params = navigation.state.params || {};
  
      return {
        headerTitle: 'Add Review',
        headerRight: (
          <Button onPress={params.save} type='outline' title="Save" containerStyle={{marginRight: 20}}/>
        ),
      };
    };
    userData = this.props.navigation.state.params;
  constructor(props) {
    super(props);
  }
  state = {
    travelerId:'',
    traverlerImageUrl:'',
    serviceId:this.userData.serviceId,
    body:'', ///need to add create time to last object
  };
  componentWillMount() {
    this.props.navigation.setParams({ save: this.save });
  }
  async componentDidMount(){
    userName = await Storage.getItem('name');
    imageUrl = await Storage.getItem('dpurl');
    this.setState({userName:userName,traverlerImageUrl:imageUrl});
  }

  save=()=>{
    const time = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    this.setState({createdBy:time})
    const data = this.state;
    const url = ''
    fetch(url,{
      method:'POST',
      headers: { 
        'Accept': 'application/json',
         'Content-Type': 'application/json' 
      },
      body:JSON.stringify(data)
    }).then(res=>res.json())
    .then(res=>{
          // --------------------------------------------------------------------------edit
    })
    .catch(error=>{
      if(error.message === 'Network request failed')
      {
        alert('Connection faild. Try again later.')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Avatar
                rounded
                size={50}
                containerStyle={styles.avatar}
                source={{uri:this.state.traverlerImageUrl===''?' ':this.state.traverlerImageUrl}}
              />
              <Text style={styles.name}>{this.state.travelerId}</Text>
          </View>
          <View style={styles.body}>
            <Input
              multiline = {true}
              label='Add Reveiw :'
              value={this.state.body}
              onChangeText={text => this.setState({body:text})}
            />
          </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    margin:10,
  },
  header:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
 
  },
  body:{
    flexGrow:1,
  },
  avatar:{
    margin:10,
  },
  name:{
    fontSize:16,
    fontWeight:'500'
  },
  btnContainer:{
    marginRight:20
  },
})