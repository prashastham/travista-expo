import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableHighlight, StyleSheet, Image, } from 'react-native';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Overlay, Button } from 'react-native-elements';
import Storage from '../local/Storage';
import * as ImagePicker from 'expo-image-picker';
import firebaseClient from '../local/FirebaseClient';

export default class Gallery extends Component {
  static navigationOptions = {
    title: 'Gallery',
    headerTintColor: Colors.stackHeaderTintColor,
  }
  img_data = this.props.navigation.state.params.galleryImage
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      activeImage: '',
      isMenuOverlay: false,
      im_1: this.img_data.im_1,
      im_2: this.img_data.im_2,
      im_3: this.img_data.im_3,
      imUpload: false,
    };
  }

  componentDidMount() {
    this.willFocus = this.props.navigation.addListener('willFocus', async () => {
      let accessToken = await Storage.getItem("accessToken");
      this.setState({ accessToken: accessToken });
      console.log(this.img_data.im_1)
    });
    this.getPermissionAsync();
  }

  componentWillUnmount() {
    this.willFocus;
  }

  openOverlay = (image) => {
    this.setState({ activeImage: image, isMenuOverlay: true })
  }

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
    });

    console.log(result);

    if (!result.cancelled) {
      // this.setState({ [this.state.activeImage]: result.uri });
      console.log(result.uri);
      this.uploadImageAsync(result.uri);
    }
  };

  uploadImageAsync = async uri => {
    this.setState({ imUpload: true });
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const uid = this.state.accessToken;
    const ref = firebaseClient
      .storage()
      .ref("users/" + uid + "/gallery/")
      .child(`${this.state.activeImage}.jpg`);
    const uploadTask = ref.put(blob);

    uploadTask.on(
      "state_changed",
      snapshot => {
        var progress = snapshot.bytesTransferred / snapshot.totalBytes;
        this.setState({ progress: progress });
        console.log("Upload is " + progress + "% done");
      },
      function (error) {
        // Handle unsuccessful uploads
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log("File available at", downloadURL);
          blob.close();
          // var galleryImage = {...this.state.galleryImage}
          // galleryImage = downloadURL;
          this.setState({ [this.state.activeImage]: downloadURL, progress: 0 });
          console.log(downloadURL);
          this.updateimageurl();
        });
      }
    );
  };

  updateimageurl = () => {
    const url = 'https://us-central1-travista-chat.cloudfunctions.net/app/api_app/profileupdate'

    galleryImage = {
      im_1: this.state.im_1,
      im_2: this.state.im_2,
      im_3: this.state.im_3,
    }
    const data = {
      accessToken: this.state.accessToken,
      galleryImage: galleryImage
    }
    console.log(data)
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res => res.json()))
      .then(res => {
        console.log(res)
        Storage.setItem('galleryImage', galleryImage)
        this.setState({ imUpload: false });
      })
      .catch(error => {
        console.log('There is some problem in your fetch operation' + error.message)
        if (error.message === 'Network request failed') {
          alert('Connection faild. Try again later.')
        }
      })
  }

  render() {
    if (this.state.imUpload) {
      return (
        <View style={styles.mainContainer}>
          <ActivityIndicator
            size='large'
          />
        </View>
      );
    }
    else {
      return (
        <View style={styles.mainContainer}>
          <View style={styles.subFirstContainer}>
            <View style={styles.subSecondContainer}>
              <TouchableHighlight style={styles.touch} onPress={() => this.openOverlay('im_1')}>
                <Image
                  source={this.state.im_1 !== "" ? { uri: this.state.im_1 } : require("../assets/images/defaultGallary.png")}
                  loadingIndicatorSource={<ActivityIndicator />}
                  style={styles.galleryImage}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.subSecondContainer}>
              <TouchableHighlight style={styles.touch} onPress={() => this.openOverlay('im_2')}>
                <Image
                  source={this.state.im_2 !== "" ? { uri: this.state.im_2 } : require("../assets/images/defaultGallary.png")}
                  loadingIndicatorSource={<ActivityIndicator />}
                  style={styles.galleryImage}
                />
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.subFirstContainer}>
            <TouchableHighlight style={styles.touch} onPress={() => this.openOverlay('im_3')}>
              <Image
                source={this.state.im_3 !== "" ? { uri: this.state.im_3 } : require("../assets/images/defaultGallary.png")}
                loadingIndicatorSource={<ActivityIndicator />}
                style={styles.galleryImage}
              />
            </TouchableHighlight>
          </View>
          <Overlay
            isVisible={this.state.isMenuOverlay}
            onBackdropPress={() => this.setState({ isMenuOverlay: false })}
            overlayBackgroundColor="#fff"
            overlayStyle={{
              padding: 0,
              justifyContent: "center",
              alignContent: "center"
            }}
            animationType="slide"
          >
            <View style={styles.overlayContainer}>
              <View style={styles.overlayTextContainer}>
                <Button
                  title={'Change'}
                  type='outline'
                  buttonStyle={styles.overlayButton}
                  onPress={() => { this._pickImage() }}
                />
              </View>
              <View style={styles.overlayImage}>
                <Image
                  source={this.state[this.state.activeImage] !== "" ? { uri: this.state[this.state.activeImage] } : require("../assets/images/defaultGallary.png")}
                  loadingIndicatorSource={<ActivityIndicator />}
                  style={styles.galleryImage}
                />
              </View>
            </View>
          </Overlay>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  subFirstContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 5,
  },
  subSecondContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 2,
  },
  touch: {
    flexGrow: 1,
    margin: 0,
  },
  galleryImage: {
    flexGrow: 1,
    width: '100%',
    marginVertical: 2,
    borderRadius: 15,
  },
  overlayImage: {
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 2,
  },
  overlayContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 5,
  },
  overlayTextContainer: {
    flexShrink: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayButton: {
    borderWidth: 1,
    paddingHorizontal: '37%',
  },
})