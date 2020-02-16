import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Storage from '../../local/Storage';
import { Avatar, Input, Button, Image, Icon, Overlay} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

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
    latitude:'',
    longitude:'',
    place:'',
    body:'', ///need to add create time to last object
    imageUrl:'',
    errorMessage:'',
    isOverlayVisible:false,
  };
  componentWillMount() {
    this.props.navigation.setParams({ save: this.save });
  }
  async componentDidMount(){
    userName = await Storage.getItem('name');
    imageUrl = await Storage.getItem('dpurl');
    let travelerId = await Storage.getItem("accessToken");
    this.setState({travelerId:travelerId ,travelerName:userName, traverlerImageUrl:imageUrl,});
    // this.getPermissionAsync();
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
   uploadImageAsync = async uri => {
        this.setState({ dpupload: true });
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
        const uid = this.state.id;
        const ref = firebaseClient
        .storage()
        .ref("users/" + uid)
        .child("dp.jpg");
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
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("File available at", downloadURL);
            blob.close();
            this.setState({dpurl:downloadURL,dpupload:false,progress:0});
            this.updateimageurl();
            });
        }
        );
    };

    //-------------------------------------------------------------------------

    getPermissionAsync = async () => {
          const p1 = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (p1.status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            this.props.navigation.goBack()
          }
          const p2 = await Permissions.getAsync(Permissions.CAMERA)
          if (p2.status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            this.props.navigation.goBack()
          }
      };
    
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
          allowsEditing: true,
          aspect: [5, 5]
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          //   this.setState({ image: result.uri });
          this.uploadImageAsync(result.uri);
        }
      };

      _launchCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
          allowsEditing: true,
          aspect: [3, 2]
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          //   this.setState({ image: result.uri });
        //   this.uploadImageAsync(result.uri);
        }
      };


  save=()=>{
    if(!this.validate())
    {
      return false;
    }
    this.setState({loading:true})
    const data = {
      uid:this.state.travelerId,
      travelerId:this.state.travelerName,
      travelerImage:this.state.traverlerImageUrl,
      serviceId:this.state.serviceId,
      body:this.state.body,
    };
    const url = 'https://us-central1-travista-chat.cloudfunctions.net/api/review'
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
                    onPress={()=>this._launchCamera()} //this.setState({isOverlayVisible:true})
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
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="red"
                onBackdropPress={() => this.setState({ isOverlayVisible: false })}
                width="70%"
                height={250}
            >
                <Text>Hello from Overlay!</Text>
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
})
