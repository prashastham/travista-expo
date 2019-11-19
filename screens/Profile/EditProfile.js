import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Button , Overlay, Input} from 'react-native-elements';

export default class EditProfile extends Component {

  static navigationOptions = {
      title:'Edit Profile',
      headerTintColor:Colors.stackHeaderTintColor,
  }
  constructor(props) {
    super(props);
    this.state = {
      name:'Lahiru'
    };
    
  }
  current_data = this.props.navigation.state.params

  save(){
    alert('hello')
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.saveContainer}>
          <Text>Save Your Changes</Text>
          <Button
            title='Save'
            type='outline'
            raised={true}
            buttonStyle={styles.saveButton}
            onPress={()=>this.save()}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='Name :'
            value={this.current_data.name}
            leftIcon={{ type: 'material', name: 'account-circle', containerStyle:{marginRight:10} }}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='E-Mail :'
            value={this.current_data.email}
            leftIcon={{ type: 'material', name: 'email', containerStyle:{marginRight:10} }}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='Hometown :'
            value={this.current_data.hometown}
            leftIcon={{ type: 'material', name: 'room', containerStyle:{marginRight:10} }}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='From :'
            value={this.current_data.from}
            leftIcon={{ type: 'material', name: 'room', containerStyle:{marginRight:10} }}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='Country :'
            value={this.current_data.country}
            leftIcon={{ type: 'material', name: 'room', containerStyle:{marginRight:10} }}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='Interest :'
            value={this.current_data.interest}
            leftIcon={{ type: 'material', name: 'pool', containerStyle:{marginRight:10} }}
          />
        </View>
        <View style={styles.editField}>
          <Input
            label='Worksin :'
            value={this.current_data.worksin}
            leftIcon={{ type: 'material', name: 'work', containerStyle:{marginRight:10} }}
          />
        </View>   
        <View style={styles.editField}>
          <Input
            label='Telenumber :'
            value={this.current_data.telenumber}
            leftIcon={{ type: 'material', name: 'phone', containerStyle:{marginRight:10} }}
          />
        </View> 
        <View style={styles.editField}>
          <Input
            label='Bio :'
            value={this.current_data.bio}
            leftIcon={{ type: 'material', name: 'assignment', containerStyle:{marginRight:10} }}
          />
        </View> 
      </ScrollView>
    );
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
    marginBottom:50
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
})