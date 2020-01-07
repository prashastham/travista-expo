import React,{Component  } from "react";
import { View,Text,YellowBox,StyleSheet,Platform,Dimensions,ScrollView,Image,SafeAreaView,Alert,TouchableOpacity,PlatformOSType, ActivityIndicator } from "react-native";
import {Avatar,Icon,Overlay,Button} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import Post from '../../elements/Post';
import HeaderIcon from "../../components/HeaderIcon";

export default class Profile extends Component {
 
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
      email:'',
      name:'',
      hometown:'',
      from:'',
      country:'',
      interest:'',
      worksin:'',
      telenumber:'',
      dpurl:'',
      bio:'',
      visible:false,
      isOverlayVisible:false,
      loading:true
    }
    
    componentDidMount(){
      this.getdata()
      // this.setState({id:this.current_data.accessToken});
      // this.willFocus = this.props.navigation.addListener('willFocus', async () => {
      //   let email = await Storage.getItem("email");
      //   let name = await Storage.getItem("name");
      //   let id = await Storage.getItem("accessToken");
      //   let telenumber = await Storage.getItem("telenumber");
      //   let dpurl = await Storage.getItem('dpurl')
      //   let bio = await Storage.getItem('bio')
      //   let country = await Storage.getItem('country')
      //   let from = await Storage.getItem('from')
      //   let hometown = await Storage.getItem('hometown')
      //   let interest = await Storage.getItem('interest')
      //   let worksin = await Storage.getItem('worksin')
      //   this.setState({
      //       email:email,
      //       name:name,
      //       id:id,
      //       telenumber:telenumber,
      //       dpurl:dpurl,
      //       bio:bio,
      //       country:country,
      //       from:from,
      //       hometown:hometown,
      //       interest:interest,
      //       worksin:worksin,
      //   })
      // });
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
            <LinearGradient
              start={{ x: 0.2, y: 0.1 }}
              colors={["#ccff66", "#00ff00"]}
              style={styles.linearGradient}
            >
              <Avatar
                rounded
                size={170}
                title={this.state.name.toUpperCase()[0]}
                containerStyle={{
                  marginTop: 50,
                  marginBottom: 50,
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
            </LinearGradient>
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
                    name="work"
                    type="material"
                    color="#aaaaaa"
                    containerStyle={styles.dataicon}
                  />
                  <Text style={styles.datalable}>Works in </Text>
                  <Text style={styles.datatext}>{this.state.worksin}</Text>
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
                  <Text style={styles.datalable}>Lives in </Text>
                  <Text style={styles.datatext}>
                    {this.state.hometown}, {this.state.country}
                  </Text>
                </View>
              ) : null}
              {this.state.from !== "" ? (
                <View style={styles.datafield}>
                  <Icon
                    name="location-on"
                    type="material"
                    color="#aaaaaa"
                    containerStyle={styles.dataicon}
                  />
                  <Text style={styles.datalable}>From </Text>
                  <Text style={styles.datatext}>{this.state.from}</Text>
                </View>
              ) : null}
              {this.state.interest !== "" ? (
                <View style={styles.datafield}>
                  <Icon
                    name="favorite-border"
                    type="material"
                    color="#aaaaaa"
                    containerStyle={styles.dataicon}
                  />
                  <Text style={styles.datalable}>Interest </Text>
                  <Text style={styles.datatext}>{this.state.interest}</Text>
                </View>
              ) : null}
              {this.state.email !== "" ? (
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
              {this.state.telenumber !== "" ? (
                <View style={styles.datafield}>
                  <Icon
                    name="phone"
                    type="material"
                    color="#aaaaaa"
                    containerStyle={styles.dataicon}
                  />
                  <Text style={styles.datalable}>Telephone </Text>
                  <Text style={styles.datatext}>{this.state.telenumber}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.profilegallerycontainer}>
              <View style={styles.subgallerycontainer}>
                <Image
                  style={styles.galleryimage}
                  source={{
                    uri:
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Pomeranian_in_garden.jpg/1200px-Pomeranian_in_garden.jpg"
                  }}
                />
                <Image
                  style={styles.galleryimage}
                  source={{
                    uri:
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Pomeranian_in_garden.jpg/1200px-Pomeranian_in_garden.jpg"
                  }}
                />
              </View>
              <View style={styles.subgallerycontainer}>
                <Image
                  style={styles.galleryimage}
                  source={{
                    uri:
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Pomeranian_in_garden.jpg/1200px-Pomeranian_in_garden.jpg"
                  }}
                />
              </View>
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
              <Text style={{ fontSize: 20, fontWeight: "500" }}>{this.state.name}'s Memories</Text>
            </View>
            <Post />
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
