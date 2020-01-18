import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Card, Avatar, SearchBar, Icon } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

export default class ServiceFilter extends Component {
    static navigationOptions = {
        title:'Services',
        headerTintColor:Colors.stackHeaderTintColor,
    }
  constructor(props) {
    super(props);
    this.state = {
        data:[],
        staticData:[],
        loading:false,
    };
  }

  componentDidMount(){
      this.loadData();
  }

  loadData(){
      url = 'https://us-central1-travista-chat.cloudfunctions.net/api/users';
      this.setState({loading:true})
      fetch(url,{
        method:'GET',
        headers: { 
          'Accept': 'application/json',
           'Content-Type': 'application/json' 
        }
      })
      .then(res=>res.json())
      .then(res=>{
          this.setState({data:res,loading:false,staticData:res})
      })
      .catch(err=>{
        if(error.message === 'Network request failed')
        {
          alert('Connection faild. Try again later.')
        }
      })
  }

  searchFilterFunction = text => {    
    this.setState({text:text})
    if(text!=='')
    {
        this.setState({loading:true})
        const value = text.trim().toUpperCase();
        let newData = [];
        newData = this.state.staticData.filter((item) => {
            return item.name.toUpperCase().match(value)
        })
        this.setState({ data: newData, loading:false});
    }
    else{
        this.setState({data:this.state.staticData})
    }  
  };

  render() {
    return (
      <View style={{flex:1}}>
        <SearchBar placeholder="Search Services..." lightTheme onChangeText={text => this.searchFilterFunction(text)} autoCorrect={false} value={this.state.text}/>
        <SafeAreaView style={{flex:1}}>
        <ScrollView>
        {   this.state.loading
            ?
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size={"large"} color='#666666'/>
                </View>
            :
            this.state.data.length > 0
            ?
            this.state.data.map((user,i)=>{
                return(
                
                <Card
                    key = {i}
                    wrapperStyle = {styles.cardContainer}
                    containerStyle={{padding:3}}
                >
                    <TouchableOpacity style={styles.cardContentItemTouch} onPress={()=>this.props.navigation.navigate('ServiceProfile',{token:user.name})}>
                        <View style={styles.touchContent}>
                        <Avatar
                            rounded
                            source={{uri:user.imageUrl}}
                            title = {user.name[0].toUpperCase()}
                            containerStyle={styles.cardContentItemAvatar}
                            size={50}
                        />  
                        <Text style={styles.cardContentItemText}>{user.name}</Text>
                        </View>
                        <Icon
                            name='more-vert'
                            color='#c6c6c6'
                        />
                    </TouchableOpacity>
                </Card>
                )
            })
            :
            <Text style={styles.emptyMessage}>Nothing to Show</Text>
        }
        </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    cardContainer:{
        flexGrow:1,
        padding:0
    },cardContentItemTouch:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    touchContent:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    cardContentItemAvatar:{
        padding:5,
    },
    cardContentItemText:{
        padding:5,
        justifyContent:'center',

    },
    emptyMessage:{
        marginTop:50,
        fontSize:16,
        fontWeight:'500',
        color:'#c6c6c6',
        textAlign:'center',
    },
    indicatorContainer:{
        flexGrow:1,
        justifyContent:'center',
        alignContent:'center',
    }
    
})