import React,{Component  } from "react";
import { View,Text,YellowBox,StyleSheet,Platform,Dimensions,ScrollView,Image, ActivityIndicator, ImageBackground, Linking} from "react-native";
import {Avatar,Icon,Overlay,Button} from 'react-native-elements';
import Colors from '../../constants/Colors';
import Review from '../../elements/Review';

export default class ServiceProfile extends Component {
 
    static navigationOptions = {
        title: "Profile",
        headerTintColor:Colors.stackHeaderTintColor,
      };

    current_data = this.props.navigation.state.params
    constructor(props) {
   
      super(props);
   
      YellowBox.ignoreWarnings([
        'Warning: componentWillMount is deprecated',
        'Warning: componentWillReceiveProps is deprecated',
        'Warning: Setting a timer for a long period of time',
      ]);

      
   
    }
    state = {
      id:this.current_data.accessToken,
      email:'anjanasamindraperera@gmail.com',
      name:'Hotel kamaro',
      location:'bandaragama',
      lat:'6.9270786',
      lng:'79.861243',
      telenumber:'075-2713825',
      dpurl:'https://firebasestorage.googleapis.com/v0/b/travista-chat.appspot.com/o/219809563563.jpg?alt=media',
      coverurl:'https://firebasestorage.googleapis.com/v0/b/travista-chat.appspot.com/o/857703376913.jpg?alt=media',
      bio:'This is my hotel',
      category:'Hotel',
      website:'http://kamaro.lk',
      booking:'http://Booking.lk',
      reviews:[
                {
                    "reviewId": "ZnWaMKlpmG0ZpfCKKuNv",
                    "body": "ake time to relax and refresh. Take a dip in the pool or get in a workout in the gym. Enjoy a relaxing meal poolside or visit our on-site restaurant or bar.",
                    "travelerId": "shamen",
                    "traverlerImageUrl":"https://firebasestorage.googleapis.com/v0/b/travista-chat.appspot.com/o/users%2FiY61tXyWBOerZ1dqTkRjkwqRRoi1%2Fdp.jpg?alt=media&token=12a6a636-c795-4d1d-ba45-9eb27ae3e013",
                    "serviceId": "Thilara hotel ",
                    "createdAt": "2019-10-12T17:03:20.813Z"
                },
                {
                    "reviewId": "ZnWaMKlpmG0ZpfCKKuNv",
                    "body": "a hotel",
                    "travelerId": "shamen",
                    "traverlerImageUrl":"https://firebasestorage.googleapis.com/v0/b/travista-chat.appspot.com/o/users%2FiY61tXyWBOerZ1dqTkRjkwqRRoi1%2Fdp.jpg?alt=media&token=12a6a636-c795-4d1d-ba45-9eb27ae3e013",
                    "serviceId": "Thilara hotel ",
                    "createdAt": "2019-10-12T17:03:20.813Z"
                },
                {
                    "reviewId": "ZnWaMKlpmG0ZpfCKKuNv",
                    "body": "ake time to relax and refresh. Take a dip in the pool or get in a workout in the gym. Enjoy a relaxing meal poolside or visit our on-site restaurant or bar.",
                    "travelerId": "shamen",
                    "traverlerImageUrl":"https://firebasestorage.googleapis.com/v0/b/travista-chat.appspot.com/o/users%2FiY61tXyWBOerZ1dqTkRjkwqRRoi1%2Fdp.jpg?alt=media&token=12a6a636-c795-4d1d-ba45-9eb27ae3e013",
                    "serviceId": "Thilara hotel ",
                    "createdAt": "2019-10-12T17:03:20.813Z"
                }
            ],
      visible:false,
      isOverlayVisible:false,
      loading:false
    }
    
    componentDidMount(){
    //   this.getdata()
    }
  
  getdata = () =>{
    this.setState({loading:true})
   const url = `https://us-central1-travista-chat.cloudfunctions.net/app/api/login?access=${this.state.id}`
    console.log(this.state.id)
    fetch(url,{
      method:'GET',
      headers: { 
        'Accept': 'application/json',
         'Content-Type': 'application/json' 
      },
    })
    .then((res => res.json()))
    .then(res =>{
      console.log(res)
      this.setState({
        email:res.email,
        name:res.name,
        telenumber:res.telenumber,
        dpurl:res.dpurl,
        bio:res.bio,
        country:res.country,
        from:res.from,
        hometown:res.hometown,
        interest:res.interest,
        worksin:res.worksin,
    })
      this.setState({loading:false});
    })
    .catch(error=>{
      console.log('There is some problem in your fetch operation'+error.message)
      if(error.message === 'Network request failed')
      {
        alert('Connection faild. Try again later.')
      }
    })
  }

  dialCall (){
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${'+`${this.state.telenumber}`+'}';
    }
    else {
      phoneNumber = 'telprompt:${'+`${this.state.telenumber}`+'}';
    }
 
    Linking.openURL(phoneNumber);
  }

  openLocation (){
      console.log('hello')
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${this.state.lat},${this.state.lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    
    
    Linking.openURL(url);
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
        
        <View style={styles.MainContainer}>
          <ScrollView>
            <ImageBackground
              source={{ uri: this.state.coverurl }}
              style={styles.linearGradient}
            >
              <Avatar
                rounded
                size={170}
                title={this.state.name.toUpperCase()[0]}
                containerStyle={{
                  marginTop: 100,
                  marginBottom: 0,
                  borderWidth: 4,
                  borderColor: "#fff"
                }}
                source={{
                  uri: this.state.dpurl===''?' ':this.state.dpurl //this.state.dpurl,
                }}
                onPress={() => {
                  this.setState({ isOverlayVisible: this.state.dpurl===''?false:true });
                }}
              />
            </ImageBackground>
            {/* add overlay to avatar */}
            <Overlay
              isVisible={this.state.isOverlayVisible}
              onBackdropPress={() => this.setState({ isOverlayVisible: false })}
              width={304}
              height={304}
              overlayBackgroundColor="#000"
              overlayStyle={{
                padding: 0,
                justifyContent: "center",
                alignItems: "center"
              }}
              animationType="none"
            >
              <Image
                source={{ uri: this.state.dpurl }}
                style={{ width: 300, height: 300, margin: 0 }}
              />
            </Overlay>
            <View style={styles.namefield}>
              <Text style={styles.nametext}>{this.state.name}</Text>
              {this.state.bio !== "" ? (
                <Text style={styles.bioText} numberOfLines={2}>
                  {this.state.bio}
                </Text>
                ):null
              }
            </View>
            <View style={styles.datacontainer}>
              {this.state.worksin !== "" ? (
                <View style={styles.datafield}>
                  <Icon
                    name="info"
                    type="material"
                    color="#aaaaaa"
                    containerStyle={styles.dataicon}
                  />
                  <Text style={styles.datalable}>Type </Text>
                  <Text style={styles.datatext}>{this.state.category}</Text>
                </View>
              ) : null}
              {this.state.hometown !== "" ? (
                <View style={styles.datafield}>
                  <Icon
                    name="location-on"
                    type="material"
                    color="#aaaaaa"
                    containerStyle={styles.dataicon}
                  />
                  <Text style={styles.datalable}>Location </Text>
                  <Text style={styles.datatext} onPress={()=>this.openLocation()}>{this.state.location}</Text>
                </View>
              ) : null}
              {this.state.from !== "" ? (
                <View style={styles.datafield}>
                  <Icon
                    name="email"
                    type="material"
                    color="#aaaaaa"
                    containerStyle={styles.dataicon}
                  />
                  <Text style={styles.datalable}>E-mail </Text>
                  <Text style={styles.datatext}>{this.state.email}</Text>
                </View>
              ) : null}
              {this.state.interest !== "" ? (
                <View style={styles.datafield}>
                  <Icon
                    name="phone"
                    type="material"
                    color="#aaaaaa"
                    containerStyle={styles.dataicon}
                  />
                  <Text style={styles.datalable}>Telephone </Text>
                  <Text style={styles.datatext} onPress={()=>this.dialCall()}>{this.state.telenumber}</Text>
                </View>
              ) : null}
              {this.state.email !== "" ? (
                <View style={styles.datafield}>
                  <Icon
                    name="web"
                    type="material"
                    color="#aaaaaa"
                    containerStyle={styles.dataicon}
                  />
                  <Text style={styles.datalable}>Website </Text>
                  <Text style={styles.datatextUrl} onPress = {()=>Linking.openURL(this.state.website)}>{this.state.website}</Text>
                </View>
              ) : null}
              {this.state.telenumber !== "" ? (
                <View style={styles.datafield}>
                  <Icon
                    name="book"
                    type="material"
                    color="#aaaaaa"
                    containerStyle={styles.dataicon}
                  />
                  <Text style={styles.datalable}>Booking </Text>
                  <Text style={styles.datatextUrl} onPress = {()=>Linking.openURL(this.state.booking)}>{this.state.booking}</Text>
                </View>
              ) : null}
            </View>
            <View
              style={{
                justifyContent: "center",
                paddingVertical: 15,
                paddingLeft: 10,
                borderBottomWidth: 0.5,
                borderBottomColor: "#af4"
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>{this.state.name}'s Reviews</Text>
            </View>
            <Review review={this.state.reviews}/>
          </ScrollView>
        </View>
      );
    }
  }
}

  const styles = StyleSheet.create({
 
    MainContainer: {
      paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
      backgroundColor:'#fff',
    },
    namefield:{
        flexGrow:1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"transparent",
        width:'100%',
        height:100,
        marginVertical: 10,
    },
    progressBar:{
      flexGrow:1,
      flexDirection:'column',
      alignItems:'center',
      paddingVertical:10,
    },
    nametext:{
        fontSize:30,
        fontWeight: '300',
        color:'#000',
        textAlign:'center',
    },
    datacontainer:{
      flexGrow:1,
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'space-evenly',
      marginVertical: 10,
    },
    datafield:{
      flexGrow:1,
      flexDirection: 'row',
      marginHorizontal: 10,
      justifyContent:'flex-start',
      alignItems:'center',
      backgroundColor:"#fff",
      width:'100%',
      height:35,
    },
    datalable:{
      fontSize:17,
      color:'#000',
      marginHorizontal:10,
    },
    datatext:{
      fontSize:17,
      fontWeight: 'bold',
      color:'#000'
    },datatextUrl:{
      fontSize:17,
      fontWeight: 'bold',
      color:'#39f'
    },
    dataicon:{
      marginHorizontal:5,
    },
    menufield:{
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center',
      width:'100%',
      height:80,
      paddingHorizontal:10,
      backgroundColor:'transparent',
      borderTopWidth:0.5,
      borderTopColor:'#af4',//2de527

    },
    menuicon:{
      backgroundColor:'#ff0',
      width:53,
      height:53,
      borderRadius:100,
      justifyContent:'center',
      alignItems:'center',
    },
    linearGradient:{
        flexGrow:1,
        width:'100%',
        height:250,
        alignItems:"center",
        justifyContent:"center",
        borderBottomRightRadius:200,
    },
    bioBtn:{
      width:50,
      height:25,
      borderWidth:2,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:25,
      borderColor:'#2de527',
      marginVertical:10,
    },
    bioBtnText:{
      fontSize:14,
      color:'#2de527',
      alignItems:'center',
      justifyContent:'center',
    },
    bioText:{
      fontSize:17,
      width:'75%',
      marginTop:10,
      textAlign:'center',
      justifyContent:'center',
    },
    profilegallerycontainer:{
      flexGrow:1,
      width:'100%',
      height:330,
      paddingVertical:5,
      borderTopWidth:0.7,
      borderColor:'#af4',
      backgroundColor:'transparent',
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center',
    },
    subgallerycontainer:{
      width:'48%',
      height:'98%',
      backgroundColor:'transparent',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'space-evenly',
    },
    galleryimage:{
      flexGrow:1,
      width:'100%',
      marginVertical:2,
      borderRadius:15,
    },
    galleryedit:{
      flexGrow:1,
      width:'100%',
      height:50,
      paddingBottom:10,
      backgroundColor:'transparent',
      alignItems:'center',
      justifyContent:'center',
      borderBottomWidth:0.6,
      borderBottomColor:'#af4',
    },
    galleryeditbtn:{
      width:'90%',
      height:40,
      backgroundColor:'#0000ff33',
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center'
    },
    galleryeditbtntext:{
      alignItems:'center',
      justifyContent:'center',
      color:'#00f',
      fontSize:14,
      fontWeight:'bold',
    },
    moreOptionModal:{
      justifyContent:'flex-end',
      margin:0,
    },
    modalContent:{
      backgroundColor: 'white',
      padding: 22,
      flexDirection:'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContentRow:{
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems: 'center',
      width:'100%',
      height:65,
      // borderBottomWidth:1,
      // borderBottomColor:'#ccc'
    },
    modalContentRowText:{
      flexGrow:1,
      fontSize:17,
      fontWeight:'300',
      marginLeft:10,
    },
    activityIndicator:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
});
