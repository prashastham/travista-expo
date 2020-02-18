import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Storage from '../../local/Storage';
import { Avatar, Input, Button, Image, Icon, Overlay} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import firebaseClient from '../../local/FirebaseClient';
import moment from 'moment';


export default class MapPic extends Component {

    static navigationOptions = ({ navigation }) => {
      const params = navigation.state.params || {};
  
      return {
        headerTitle: 'Add Picture Post',
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
    travelerName:'',
    traverlerImageUrl:'',
    latitude:this.userData.region.latitude,
    longitude:this.userData.region.longitude,
    place:'',
    body:'', ///need to add create time to last object
    imageUrl:'',
    errorMessage:'',
    image:'',
    isOverlayVisible:false,
    loading:false,
    latitude:'',
    longitude:'',
  };
  componentWillMount=async()=> {
    this.props.navigation.setParams({ save: this.save });
    // Location.setApiKey('AIzaSyCN1tAyAammD_ym0fJsvLhc0z_hJfwxtWc');
    // const loc = await Location.getCurrentPositionAsync({accuracy:5});
    // this.setState({latitude:loc.coords.latitude,longitude:loc.coords.longitude});
  }
  async componentDidMount(){
    userName = await Storage.getItem('name');
    dpUrl = await Storage.getItem('dpurl');
    let travelerId = await Storage.getItem("accessToken");
    console.log(this.userData.region)
    this.setState({travelerId:travelerId ,travelerName:userName, traverlerImageUrl:dpUrl,latitude:this.userData.region.latitude,longitude:this.userData.region.longitude});
  }

  validate=()=>{
    if(this.state.body === ""){
      this.setState({errorMessage:'Caption can\'t be empty!',errorStyle:styles.errorInput});
      return false;
    }
    else{
      this.setState({errorMessage:'',errorStyle:{}});
      return true;
    }
  }
   // ------------------------------------------------------------------------
   uploadImageAsync = async (uri, lambda) => {
        this.setState({ loading: true });
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        };
        xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
        });
        const uid = this.state.travelerId;
        const rand = (parseInt(Math.random()*10000000000)).toString();
        const ref = firebaseClient
        .storage()
        .ref("mappics/" + uid)
        .child(rand+".jpg");
        const uploadTask = ref.put(blob);

        uploadTask.on(
        "state_changed",
        snapshot => {
            var progress = snapshot.bytesTransferred / snapshot.totalBytes;
            this.setState({ progress: progress });
            console.log("Upload is " + progress + "% done");
        },
        function(error) {
            // Handle unsuccessful uploads
            this.setState({loading:false,progress:0});
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("File available at", downloadURL);
            blob.close();
            this.setState({image:downloadURL,progress:0});
            lambda();
            });
        }
        );
    };

    //-------------------------------------------------------------------------

    // getPermissionAsync = async () => {
    //       const p1 = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //       if (p1.status !== "granted") {
    //         alert("Sorry, we need camera roll permissions to make this work!");
    //         this.props.navigation.goBack()
    //       }
    //       const p2 = await Permissions.getAsync(Permissions.CAMERA)
    //       if (p2.status !== "granted") {
    //         alert("Sorry, we need camera roll permissions to make this work!");
    //         this.props.navigation.goBack()
    //       }
    //   };
    
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
          allowsEditing: true,
          aspect: [5, 5]
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ imageUrl: result.uri });
          
          console.log(result.uri)
        }
      };

      _launchCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
          allowsEditing: true,
          aspect: [4, 3]
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            this.setState({ imageUrl: result.uri });
        }
      };


  save=async ()=>{
    if(!this.validate())
    {
      return false;
    }
    this.setState({loading:true})
    await this.uploadImageAsync(this.state.imageUrl,()=>this.request());
    
  }

  request=()=>{
    
    const data = {
      author:this.state.travelerId,
      userHandle:this.state.travelerName,
      dpurl:this.state.traverlerImageUrl,
      body:this.state.body,
      image:this.state.image,
      latitude:this.state.latitude,
      longitude:this.state.longitude,
      createdAt:moment().format(),
    };
    const url = 'https://us-central1-travista-chat.cloudfunctions.net/app/api_app/addpicture'
    fetch(url,{
      method:'POST',
      headers: { 
        'Accept': 'application/json',
         'Content-Type': 'application/json' 
      },
      body:JSON.stringify(data)
    }).then(res=>res.json())
    .then(res=>{
          console.log(res)
          this.setState({loading:false});
          this.props.navigation.goBack();
    })
    .catch(error=>{
      if(error.message === 'Network request failed')
      {
        alert('Connection faild. Try again later.')
        this.setState({loading:false})
      }
      else{
        alert(error.message);
      }
    })
  }

  render() {
    if(this.state.loading){
      return(
        <View style={styles.activityIndicator}>
        <ActivityIndicator
          size='large'
          color='#c6c6c6'
        />
      </View>
      )  
    }
    else{
      return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avatar
                  rounded
                  size={50}
                  containerStyle={styles.avatar}
                  source={{uri:this.state.traverlerImageUrl===''?' ':this.state.traverlerImageUrl}}
                  title={this.state.travelerName.charAt(0).toLocaleUpperCase()}
                />
                <Text style={styles.name}>{this.state.travelerName}</Text>
            </View>
            <View style={styles.body}>
              <Input
                multiline = {true}
                label='Tell About Picture :'
                value={this.state.body}
                onChangeText={text => this.setState({body:text})}
                errorMessage={this.state.errorMessage}
                errorStyle={this.state.errorStyle}
                style={styles.input}
              />
              <View style={styles.getPicContainer}>
                  <Text style={styles.getPicText}>Photo :</Text>
                  <Icon
                    reverse
                    raised
                    name='camera-alt'
                    type='material'
                    size={20}
                    onPress={()=>this.setState({isOverlayVisible:true})} //this._launchCamera()
                  />
              </View>
              {this.state.imageUrl!==""?
                <Image
                    source={{uri:this.state.imageUrl}}
                    style={{ width: '100%', height: 250, borderRadius:20 }}
                    PlaceholderContent={<ActivityIndicator/>}
                />
              :null}
            </View> 
            <Overlay
                isVisible={this.state.isOverlayVisible}
                windowBackgroundColor="rgba(0, 0, 0, .5)"
                overlayBackgroundColor="white"
                onBackdropPress={() => this.setState({ isOverlayVisible: false })}
                width="70%"
                height="30%"
            >
                <View style={styles.overlayContainer}>
                  <Button title='Gallary' type='outline' buttonStyle={{borderWidth: 1,}} onPress={()=>{this.setState({isOverlayVisible:false}),this._pickImage()}}/>
                  <Button title='Camera' type='outline' buttonStyle={{borderWidth: 1,}} onPress={()=>{this.setState({isOverlayVisible:false}),this._launchCamera()}}/>
                </View>
            </Overlay>

        </View>
      );
    } 
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
  input:{
      paddingBottom:10,
  },
  errorInput:{
    color:'red',
  },
  activityIndicator:{
    flex:1,
    justifyContent:'center',
    alignContent:'center',
  },
  getPicContainer:{
      flexShrink:1,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginVertical:20,
      marginHorizontal:10,
  },
  getPicText:{
      fontSize:16,
      fontWeight:'500',
      color:'#6c707c'
  },
  overlayContainer:{
      flexGrow:1,
      width:'100%',
      height:'100%',
      justifyContent:'space-around',
  }
})
