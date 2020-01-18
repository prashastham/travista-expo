import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableHighlight, StyleSheet, Image, } from 'react-native';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Overlay, Button } from 'react-native-elements';
import Storage from '../local/Storage';
import * as ImagePicker from 'expo-image-picker';
export default class Gallery extends Component {
  static navigationOptions = {
      title:'Gallery',
      headerTintColor:Colors.stackHeaderTintColor,
  }
  img_data = this.props.navigation.state.params
  constructor(props) {
    super(props);
    this.state = {
        accessToken:'',
        activeImage:'',
        isMenuOverlay:false,
        im_1:this.img_data.im_1,
        im_2:this.img_data.im_2,
        im_3:this.img_data.im_3,
    };
  }

  componentDidMount(){
    this.willFocus = this.props.navigation.addListener('willFocus', async () => {
        let accessToken = await Storage.getItem("accessToken");
        this.setState({accessToken:accessToken});
        console.log(this.img_data.im_1)
    });
    this.getPermissionAsync();
  }
  
  componentWillUnmount() {
    this.willFocus;
  }

  openOverlay=(image)=>{
      this.setState({activeImage:image,isMenuOverlay:true})
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
      //   this.setState({ image: result.uri });
      console.log(result.uri);
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.subFirstContainer}>
            <View style={styles.subSecondContainer}>
                <TouchableHighlight style = {styles.touch} onPress={()=>this.openOverlay(this.state.im_1)}>
                <Image
                    source={{uri:this.state.im_1}}
                    loadingIndicatorSource={<ActivityIndicator/>}
                    style={styles.galleryImage}
                />
                </TouchableHighlight>
            </View>
            <View style={styles.subSecondContainer}>
                <TouchableHighlight style = {styles.touch} onPress={()=>this.openOverlay(this.state.im_2)}>
                <Image
                    source={{uri:this.state.im_2}}
                    loadingIndicatorSource={<ActivityIndicator/>}
                    style={styles.galleryImage}
                />
                </TouchableHighlight>
            </View>
        </View>
        <View style={styles.subFirstContainer}>
            <TouchableHighlight style = {styles.touch} onPress={()=>this.openOverlay(this.state.im_3)}>
            <Image
                source={{uri:this.state.im_3}}
                loadingIndicatorSource={<ActivityIndicator/>}
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
                            onPress={()=>{this._pickImage()}}
                        />
                </View>
                <View style={styles.overlayImage}>
                    <Image
                        source={{uri:this.state.activeImage}}
                        loadingIndicatorSource={<ActivityIndicator/>}
                        style={styles.galleryImage}
                    />
                </View>
            </View>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row',
        marginVertical:20
    },
    subFirstContainer:{
        flexGrow:1,
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        margin:5,
    },
    subSecondContainer:{
        flexGrow:1,
        justifyContent:'center',
        alignContent:'center',
        margin:2,
    },
    touch:{
        flexGrow:1,
        margin:0,
    },
    galleryImage:{
        flexGrow:1,
        width:'100%',
        marginVertical:2,
        borderRadius:15,
    },
    overlayImage:{
        flexGrow:1,
        justifyContent:'center',
        alignContent:'center',
        margin:2,
    },
    overlayContainer:{
        flexGrow:1,
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        margin:5,
    },
    overlayTextContainer:{
        flexShrink:1,
        paddingVertical:10,
        justifyContent:'center',
        alignItems:'center',
    },
    overlayButton:{
        borderWidth:1,
        paddingHorizontal:'37%',
    },
})