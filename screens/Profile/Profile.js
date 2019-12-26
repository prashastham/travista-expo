import React, { Component } from "react";
import {
  View,
  Text,
  YellowBox,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Avatar, Icon, Overlay } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Storage from "../../local/Storage";
import firebaseClient from "../../local/FirebaseClient";
import Colors from "../../constants/Colors";
import Post from "../../elements/Post";
import HeaderIcon from "../../components/HeaderIcon";
import * as Progress from "react-native-progress";

export default class Profile extends Component {
  static navigationOptions = {
    title: "Profile",
    headerTintColor: Colors.stackHeaderTintColor,
    headerLeft: <HeaderIcon />
  };

  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings([
      "Warning: componentWillMount is deprecated",
      "Warning: componentWillReceiveProps is deprecated",
      "Warning: Setting a timer for a long period of time"
    ]);
  }
  state = {
    id: "1234567",
    editable: "true", //this for identify own account. not still use!
    email: "lahirupathum1223@gmail.com",
    name: "Lahiru Pathum",
    hometown: "Yakkalamulla",
    from: "Galle",
    country: "Sri Lanaka",
    interest: "Beach",
    worksin: "Travista Group",
    telenumber: "0776480429",
    dpurl:
      "https://vignette4.wikia.nocookie.net/animal-jam-clans-1/images/7/75/Facepalm-cat-300x300.jpg/revision/latest?cb=20151223193525",
    bio: "Hey there, this is about you. Say something shortly",
    visible: false,
    isOverlayVisible: false,
    progress: 0,
    dpupload: false
  };
  async componentDidMount() {
    //   let email = await Storage.getItem("email");
    //   let name = await Storage.getItem("name");
    //   let id = await Storage.getItem("id");
    //   let telenumber = await Storage.getItem("telenumber");
    //   let dpurl = await Storage.getItem('dpurl')
    //   this.setState({
    //       email:email.value,
    //       name:name.value,
    //       id:id.value,
    //       telenumber:telenumber.value,
    //       dpurl:dpurl.value,
    //   })
    this.getPermissionAsync();
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
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = snapshot.bytesTransferred / snapshot.totalBytes;
        this.setState({ progress: progress });
        console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case firebaseClient.storage.TaskState.PAUSED: // or 'paused'
        //     console.log('Upload is paused');
        //     break;
        //   case firebaseClient.storage.TaskState.RUNNING: // or 'running'
        //     console.log('Upload is running');
        //     break;
        // }
      },
      function(error) {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log("File available at", downloadURL);
          blob.close();
          this.setState({ dpurl: downloadURL, dpupload: false });
        });
      }
    );

    // We're done with the blob, close and release it
  };

  // updateimageurl = () =>{
  //   const url = 'https://ireshd-7df6e.firebaseapp.com/api/update/'
  //   const updateData = {
  //     update:'dpurl',
  //     value:this.state.dpurl,
  //     id:this.state.id
  //   }

  //   fetch(url,{
  //     method:'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //        'Content-Type': 'application/json'
  //     },
  //     body:JSON.stringify(updateData)
  //   })
  //   .then((res => res.json()))
  //   .then((res) =>{
  //     if(res.error === 'false')
  //     {
  //       Storage.removeItem('dpurl');
  //       Storage.setItem('dpurl',{value:res.dpurl, id:1});
  //       this.setState({visible:false,dpurl:res.dpurl});
  //     }
  //     else{
  //       this.setState({visible:false});
  //       alert(res.msg)
  //     }

  //   })
  // }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
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

  render() {
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
                uri: this.state.dpurl //this.state.dpurl,
              }}
              onPress={() => {
                this.setState({ isOverlayVisible: true });
              }}
              editButton={{
                name: "camera",
                type: "material-community",
                underlayColor: "#4ac959",
                iconStyle: { fontSize: 30 },
                color: "#000"
              }}
              onEditPress={() => {
                this._pickImage();
              }}
              showEditButton
            />
          </LinearGradient>
          {/* add overlay to avatay */}
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
          {this.state.dpupload ? (
            <View style={styles.progressBar}>
              <Progress.Bar progress={this.state.progress} width={200} />
              <Text>{(this.state.progress * 100).toFixed(2)}%</Text>
            </View>
          ) : null}
          <View style={styles.namefield}>
            <Text style={styles.nametext}>{this.state.name}</Text>
            {this.state.bio === "" ? (
              <TouchableOpacity style={styles.bioBtn}>
                <Text style={styles.bioBtnText}>+bio</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.bioText} numberOfLines={2}>
                {this.state.bio}
              </Text>
            )}
          </View>
          <View style={styles.menufield}>
            <Icon
              raised
              size={24}
              name="people"
              type="material"
              color="#2f95dc"
              containerStyle={styles.menuicon}
              onPress={() => this.props.navigation.navigate("Friend")}
            />
            <Icon
              raised
<<<<<<< HEAD
              size={24}
              name="account-circle"
              type="material"
              color="#2f95dc"
              containerStyle={styles.menuicon}
              onPress={() => this.props.navigation.navigate("EditProfile")}
=======
              size = {24}
              name = 'account-circle'
              type = 'material'
              color = '#4ac959'
              containerStyle = {styles.menuicon}
              onPress={() => this.props.navigation.navigate('EditProfile',this.state)}
>>>>>>> 2cd294cbee556b4e49e4b29a184d8ec96d3b2172
            />
            <Icon
              raised
              size={24}
              name="more-horiz"
              type="material"
              color="#2f95dc"
              containerStyle={styles.menuicon}
              onPress={() => Actions.changeemail()}
            />
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
          <View style={styles.galleryedit}>
            <TouchableOpacity style={styles.galleryeditbtn}>
              <Text style={styles.galleryeditbtntext}>
                Edit Public Gallery {this.state.progress}
              </Text>
            </TouchableOpacity>
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
            <Text style={{ fontSize: 20, fontWeight: "500" }}>My Memories</Text>
          </View>
          <Post />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#fff"
  },
  namefield: {
    flexGrow: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    height: 100,
    marginVertical: 10
  },
  progressBar: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10
  },
  nametext: {
    fontSize: 30,
    fontWeight: "300",
    color: "#000",
    textAlign: "center"
  },
  datacontainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 10
  },
  datafield: {
    flexGrow: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 35
  },
  datalable: {
    fontSize: 17,
    color: "#000",
    marginHorizontal: 10
  },
  datatext: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000"
  },
  dataicon: {
    marginHorizontal: 5
  },
  menufield: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 80,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    borderTopWidth: 0.5,
    borderTopColor: "#af4" //2de527
  },
  menuicon: {
    backgroundColor: "#ff0",
    width: 53,
    height: 53,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  linearGradient: {
    flexGrow: 1,
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 200
  },
  bioBtn: {
    width: 50,
    height: 25,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderColor: "#2de527",
    marginVertical: 10
  },
  bioBtnText: {
    fontSize: 14,
    color: "#2de527",
    alignItems: "center",
    justifyContent: "center"
  },
  bioText: {
    fontSize: 17,
    width: "75%",
    marginTop: 10,
    textAlign: "center",
    justifyContent: "center"
  },
  profilegallerycontainer: {
    flexGrow: 1,
    width: "100%",
    height: 330,
    paddingVertical: 5,
    borderTopWidth: 0.7,
    borderColor: "#af4",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  subgallerycontainer: {
    width: "48%",
    height: "98%",
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  galleryimage: {
    flexGrow: 1,
    width: "100%",
    marginVertical: 2,
    borderRadius: 15
  },
  galleryedit: {
    flexGrow: 1,
    width: "100%",
    height: 50,
    paddingBottom: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.6,
    borderBottomColor: "#af4"
  },
  galleryeditbtn: {
    width: "90%",
    height: 40,
    backgroundColor: "#0000ff33",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  galleryeditbtntext: {
    alignItems: "center",
    justifyContent: "center",
    color: "#00f",
    fontSize: 14,
    fontWeight: "bold"
  }
});
