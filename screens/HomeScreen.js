import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  RefreshControl
} from "react-native";
import {
  Card,
  Button,
  Avatar,
  Image,
  Header,
  Divider,
  withBadge,
  Overlay,
  ListItem
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";
import HeaderIcon from "../components/HeaderIcon";
import Storage from "../local/Storage";
import Constants from "expo-constants";
import firebaseClient from "../local/FirebaseClient";

import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import { SafeAreaView } from "react-navigation";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Warning: ..."]);
//let posts = [];

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const HomeScreen = props => {
  //camer permissions states
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  //app refresh state
  const [refreshing, setRefreshing] = React.useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dpurl, setDpurl] = useState("");

  // //check if loading is complete
  // const [isLoaded, setIsLoaded] = useState(false);

  // //holds load errors
  // const [errorState, setError] = useState(null);

  //all posts are stored here
  const [tempPosts, setTempPosts] = useState();
  const [tempAds, setTempAds] = useState();
  const [posts, setPosts] = useState([]);

  //enable views
  const [modalVisible, setModalVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  //overlay
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayImage, setOverlayImage] = useState("");

  //post data at create
  const [body, onChangeBody] = useState("");
  const [pickedImage, onPickImage] = useState(null);
  const [heightWidth, setHeightWidth] = useState({ height: 0, width: 0 });
  const [imgURL, setImageURL] = useState("");

  //comments
  const [list, setList] = useState([]);

  //input handler comment
  const [comment, setComment] = useState("");
  const [postid, setPostid] = useState("");

  //temp u
  const [tempu, setTempU] = useState(null);

  //temp i
  const [tempi, setTempI] = useState(0);

  useEffect(() => {
    this._retrieveData();
    getPosts();
    //_cameraPermissionReq;
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //re-render component/////////////////////////////////////////////
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  ///////////////////////////////////////////////////////////////////

  //app refresh function
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  // //request camera permissions
  // _cameraPermissionReq = (async () => {
  //   const { status } = await Camera.requestPermissionsAsync();
  //   setHasPermission(status === "granted");
  // })();

  //retrieve data from local storage
  _retrieveData = async () => {
    try {
      let id = await Storage.getItem("accessToken");
      let dpurl = await Storage.getItem("dpurl");
      let name = await Storage.getItem("name");

      if ((dpurl && name) !== null) {
        // We have data!!
        setId(id);
        setDpurl(dpurl);
        setName(name);
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };

  viewProfile = authorId => {
    props.navigation.navigate("OtherProfile", {
      accessToken: authorId
    });
  };

  //process all posts to be interactable
  processPosts = data => {
    data.forEach(element => {
      element.liked = false;
      element.reported = false;
      element.commented = false;
    });
    setPosts(data);
  };

  //get all posts from db
  const getPosts = () => {
    const url_post =
      "https://asia-east2-travista-chat.cloudfunctions.net/app2/posts";
    fetch(url_post)
      .then(res => res.json())
      .then(function(data) {
        processPosts(data);
        //setTempPosts(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    const url_ad =
      "https://asia-east2-travista-chat.cloudfunctions.net/app2/adsUser";
    fetch(url_ad)
      .then(res => res.json())
      .then(function(data) {
        //processPosts(data);
        //setTempAds(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    //console.log(tempAds[0]);
  };

  uploadImage = async () => {
    const uri = pickedImage.uri;
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
    const uid = id;
    const ref = firebaseClient
      .storage()
      .ref("users/" + uid + "/imgs")
      .child(`imgs/${Math.round(Math.random() * 1000000000)}.jpg`);
    const uploadTask = ref.put(blob);
    console.log(blob);
    uploadTask.on(
      "state_changed",
      function (snapshot) { },
      function (error) { },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          setImageURL(downloadURL);
        });
      }
    );
  };

  //create and upload post to db
  savePost = () => {
    uploadImage;
    const url = "https://asia-east2-travista-chat.cloudfunctions.net/app2/post";
    const newPost = {
      author: id,
      dpurl: dpurl,
      body: body,
      userHandle: name,
      createdAt: new Date().toISOString(),
      image: imgURL,
      likesCount: 0,
      reports: 0,
      commentsCount: 0,
      comments: []
    };
    if (newPost.image !== "") {
      newPost.liked = false;
      newPost.reported = false;
      newPost.commented = false;
      setPosts([newPost, ...posts]);
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
      }).then(res => console.log(res));
      //setPosts(posts.push({ newPost }));
      setModalVisible(false);
    } else {
      alert("Empty post");
    }
  };

  //image preview
  displayImage = img => {
    setOverlayImage(img);
    setOverlayVisible(true);
  };

  //open create post window
  createPost = () => {
    setModalVisible(true);
  };

  //close create post window
  cancelCreatePost = () => {
    setModalVisible(false);
  };

  getComments = postId => {
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/postandcomments/${postId}`;
    fetch(url)
      .then(res => res.json())
      .then(function (data) {
        setList(data.comments);
      });
  };

  getAdComments = postId => {
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/adsUser/${postId}`;
    fetch(url)
      .then(res => res.json())
      .then(function (data) {
        setList(data.comments);
      });
  };

  sendComment = () => {
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/posts/${postid}/comment`;
    const newComment = {
      body: comment,
      dpurl: dpurl,
      userHandle: name,
      postId: postid
    };
    console.log(newComment);
    if (comment !== "") {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
      }).then(res => console.log(res));
      closeCommentView();
    } else {
      alert("Empty comment");
    }
  };

  sendAdComment = () => {
    const url = `https://us-central1-travista-chat.cloudfunctions.net/api/adUser/${postid}/comment`;
    const newComment = {
      body: comment,
      dpurl: dpurl,
      userHandle: name,
      postId: postid
    };
    console.log(newComment);
    if (comment !== "") {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
      }).then(res => console.log(res));
      closeCommentView();
    } else {
      alert("Empty comment");
    }
  };

  //open comment window
  openCommentView = postId => {
    console.log("Comment button clicked");
    setPostid(postId);
    getComments(postId);
    setCommentVisible(true);
  };

  //open comment window for ad
  openAdCommentView = postId => {
    console.log("Comment button clicked");
    setPostid(postId);
    getAdComments(postId);
    setCommentVisible(true);
  };

  //close comment window
  closeCommentView = () => {
    setComment("");
    setCommentVisible(false);
  };

  //pick image
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      onPickImage({ uri: result.uri });
      setHeightWidth({ height: result.height, width: result.width });
      uploadImage();
    }
  };

  // take picture
  clickPhoto = async () => {
    let result = await takePictureAsync();
  };

  //report post
  reportPost = postid => {
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/reportPost/${postid}`;
    fetch(url).then(res => res.json());
  };

  //unreport post
  unreportPost = postid => {
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/unreportPost/${postid}`;
    fetch(url).then(res => res.json());
  };

  //report ad
  reportAd = postid => {
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/reportAd/${postid}`;
    fetch(url).then(res => res.json());
  };

  //unreport ad
  unreportAd = postid => {
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/unreportAd/${postid}`;
    fetch(url).then(res => res.json());
  };

  //like post
  likePost = postid => {
    const name = name;
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/post/${postid}/like/${name}`;
    fetch(url).then(res => res.json());
  };

  //unlike post
  unlikePost = postid => {
    const name = name;
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/post/${postid}/unlike/${name}`;
    fetch(url).then(res => res.json());
  };

  //like ad
  likeAd = postid => {
    console.log("ad liked");
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/`;
    fetch(url).then(res => res.json());
  };

  //unlike as
  unlikeAd = postid => {
    console.log("ad unliked");
    const url = `https://asia-east2-travista-chat.cloudfunctions.net/app2/`;
    fetch(url).then(res => res.json());
  };

  return (
    <ScrollView
      contentOffset={{ x: 10, y: 10 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/*create new post*/}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View>
          <Header
            centerComponent={{
              text: "New Post",
              style: { color: "#fff", fontSize: 18 }
            }}
            rightComponent={
              <Button
                icon={<Icon name="window-close" size={25} color={"#ff4f32"} />}
                type="clear"
                raised={true}
                onPress={() => cancelCreatePost()}
              />
            }
          />
        </View>
        <ScrollView>
          <View>
            <Divider style={{ backgroundColor: "grey" }} />
          </View>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Avatar
                size="medium"
                source={{ uri: dpurl }}
                rounded
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={styles.userCreateComment}>
              <Text style={styles.userCreateComment}>{name}</Text>
            </View>
          </View>

          <View>
            <TextInput
              editable
              multiline
              numberOfLines={3}
              maxLength={100}
              placeholder="Type post here..."
              style={{ height: 80, fontSize: 20, padding: 5 }}
              onChangeText={text => onChangeBody(text)}
              value={body}
            />
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "30%"
            }}
          >
            <Image
              source={pickedImage === null ? " " : pickedImage}
              style={heightWidth}
            />
          </View>
          <View style={{ flex: 1, flexDirection: "row-reverse", padding: 10 }}>
            <Button title="Post Now" onPress={() => savePost()} />
          </View>
          <View>
            <Divider style={{ backgroundColor: "grey" }} />
          </View>
          <View>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "row", padding: 15 }}
              onPress={() => pickImage()}
            >
              <View style={{ paddingRight: 10 }}>
                <Icon name="image" color="#2ecc71" size={30} />
              </View>
              <Text style={{ fontSize: 15, paddingTop: 5 }}>Photo</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Divider style={{ backgroundColor: "grey" }} />
          </View>
          <View>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "row", padding: 15 }}
            >
              <View style={{ paddingRight: 10 }}>
                <Icon name="camera" color="#f5b041" size={30} />
              </View>
              <Text style={{ fontSize: 15, paddingTop: 5 }}>Camera</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Divider style={{ backgroundColor: "grey" }} />
          </View>
        </ScrollView>
      </Modal>
      {/*comment view modal*/}
      <Modal animationType="slide" transparent={false} visible={commentVisible}>
        <View>
          <Header
            centerComponent={{
              text: "Comments",
              style: { color: "#fff", fontSize: 18 }
            }}
            rightComponent={
              <Button
                icon={<Icon name="window-close" size={25} color={"#ff4f32"} />}
                type="clear"
                raised={true}
                onPress={() => closeCommentView()}
              />
            }
          />
        </View>
        <SafeAreaView>
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Write a comment..."
                underlineColorAndroid="transparent"
                onChangeText={text => setComment(text)}
              />
            </View>

            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => {
                tempu.hasOwnProperty("paid") ? sendAdComment() : sendComment();
                tempu.hasOwnProperty("paid")
                  ? (posts[tempi].commentCount = tempu.commentCount + 1)
                  : (posts[tempi].commentsCount = tempu.commentsCount + 1); /////////////////////////////
                forceUpdate();
              }}
            >
              <Icon name="arrow-circle-right" size={40} color="#f2f3f4" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              felx: 1,
              flexDirection: "column-reverse"
            }}
          >
            <ScrollView>
              {list.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: { uri: l.dpurl } }}
                  title={
                    <View>
                      <Text style={{ fontSize: 15, fontWeight: "100" }}>
                        {l.userHandle}
                      </Text>
                      <Text style={{ fontSize: 10, fontWeight: "100" }}>
                        {l.createdAt.split("T")[0]}
                      </Text>
                    </View>
                  }
                  subtitle={<Text style={{ padding: 5 }}>{l.body}</Text>}
                  bottomDivider
                />
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

      {/*image overlay*/}
      <Overlay
        overlayBackgroundColor="black"
        windowBackgroundColor="black"
        isVisible={overlayVisible}
        onBackdropPress={() => {
          setOverlayVisible(false);
          setOverlayImage("");
        }}
        width="auto"
        height="auto"
      >
        <SafeAreaView>
          <Image
            source={{ uri: overlayImage }}
            style={{
              width: Dimensions.get("screen").width,
              height: 300,
              maxWidth: Dimensions.get("screen").width,
              maxHeight: Dimensions.get("screen").height * 0.8
            }}
          />
        </SafeAreaView>
      </Overlay>
      <View style={styles.container}>
        {/* style={styles.container} */}
        {posts.map((u, i) => {
          const CommentButton = withBadge(
            u.hasOwnProperty("paid") ? u.commentCount : u.commentsCount
          )(Icon);
          const LikeButton = withBadge(
            u.hasOwnProperty("paid") ? u.likeCount : u.likesCount
          )(Icon);

          return (
            <Card
              ContainerStyle={styles.postContainer}
              key={i}
              title={
                <View style={styles.header}>
                  <View style={styles.avatar}>
                    <Avatar
                      size="medium"
                      source={{ uri: u.dpurl }}
                      rounded
                      PlaceholderContent={<ActivityIndicator />}
                      onPress={() => {
                        u.hasOwnProperty("paid") ? null : viewProfile(u.author);
                      }}
                    />
                  </View>

                  <View style={styles.user}>
                    <Text></Text>
                    <TouchableOpacity
                      onPress={() => {
                        u.hasOwnProperty("paid") ? null : viewProfile(u.author);
                      }}
                    >
                      <Text style={styles.user}>{u.userHandle}</Text>
                    </TouchableOpacity>
                    <Text style={styles.date}>{u.createdAt.split("T")[0]}</Text>
                  </View>

                  <Divider style={{ backgroundColor: "grey" }} />
                </View>
              }
            >
              <View>
                <Text style={styles.description}>{u.body}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => displayImage(u.image)}>
                  <Image
                    source={{ uri: u.image }}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      minHeight: Dimensions.get("window").height * 0.4
                    }}
                    resizeMode="stretch"
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <LikeButton
                    type="ionicon"
                    name="thumbs-up"
                    status="primary"
                    size={29}
                    color={u.liked ? "#2ecc71" : "#abb2b9"}
                    onPress={() => {
                      if (u.liked === false) {
                        u.hasOwnProperty("paid")
                          ? likeAd(u.postId)
                          : likePost(u.postId);
                        posts[i].likesCount++;
                        posts[i].liked = true;
                        forceUpdate();
                      } else {
                        u.hasOwnProperty("paid")
                          ? unlikeAd(u.postId)
                          : unlikePost(u.postId);
                        posts[i].likesCount--;
                        posts[i].liked = false;
                        forceUpdate();
                      }
                    }}
                  />
                  {/*enabling comment view*/}
                  <CommentButton
                    type="ionicon"
                    name="comments"
                    status="primary"
                    size={29}
                    color={"#abb2b9"}
                    onPress={() => {
                      setTempU(u);
                      u.hasOwnProperty("paid")
                        ? openAdCommentView(u.postId)
                        : openCommentView(u.postId);
                      setTempI(i);
                    }}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                  <Button
                    icon={
                      <Icon
                        name="warning"
                        size={25}
                        color={u.reported ? "#dc7633" : "#e5e7e9"}
                      />
                    }
                    type="clear"
                    onPress={() => {
                      if (u.reported === false) {
                        u.hasOwnProperty("paid")
                          ? reportAd(u.postId)
                          : reportPost(u.postId);
                        posts[i].reports++;
                        posts[i].reported = true;
                        forceUpdate();
                      } else {
                        u.hasOwnProperty("paid")
                          ? unreportAd(u.postId)
                          : unreportPost(u.postId);
                        posts[i].reports--;
                        posts[i].reported = false;
                        forceUpdate();
                      }
                    }}
                  />
                </View>
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
};

HomeScreen.navigationOptions = {
  title: "Travista",
  headerTintColor: Colors.stackHeaderTintColor,
  headerLeft: <HeaderIcon />,
  headerRight: (
    <Button
      icon={
        <Icon
          name="address-card"
          size={25}
          color={Colors.stackHeaderTintColor}
        />
      }
      title="+"
      type="clear"
      raised={true}
      onPress={() => {
        createPost();
      }}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: Dimensions.get("screen").width
  },
  postContainer: {
    marginHorizontal: 1,
    borderRadius: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  user: {
    fontSize: 20,
    fontWeight: "100"
  },
  userCreateComment: {
    fontSize: 20,
    fontWeight: "100",
    padding: 5
  },
  date: {
    color: "#ccc",
    fontWeight: "500"
  },
  avatar: {
    padding: 5
  },
  description: {
    padding: 10
  },
  imageContainer: {
    // backgroundColor:'#f00',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10,
    padding: 5
  },
  btnSend: {
    backgroundColor: "#28b463",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center"
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  }
});

export default HomeScreen;
