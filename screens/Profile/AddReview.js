import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Storage from '../../local/Storage';
import { Avatar, Input, Button } from 'react-native-elements';

export default class AddReview extends Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Add Review',
      headerRight: (
        <Button onPress={params.save} type='outline' title="Save" containerStyle={{ marginRight: 20 }} />
      ),
    };
  };
  userData = this.props.navigation.state.params;
  constructor(props) {
    super(props);
  }
  state = {
    travelerId: '',
    travelerName: '',
    traverlerImageUrl: '',
    serviceId: this.userData.serviceId,
    body: '', ///need to add create time to last object
    errorMessage: '',
  };
  componentWillMount() {
    this.props.navigation.setParams({ save: this.save });
  }
  async componentDidMount() {
    userName = await Storage.getItem('name');
    imageUrl = await Storage.getItem('dpurl');
    let travelerId = await Storage.getItem("accessToken");
    this.setState({ travelerId: travelerId, travelerName: userName, traverlerImageUrl: imageUrl, });
  }

  validate = () => {
    if (this.state.body === "") {
      this.setState({ errorMessage: 'Review can\'t be empty!', errorStyle: styles.errorInput });
      return false;
    }
    else {
      this.setState({ errorMessage: '', errorStyle: {} });
      return true;
    }
  }

  save = () => {
    if (!this.validate()) {
      return false;
    }
    this.setState({ loading: true })
    const data = {
      uid: this.state.travelerId,
      travelerId: this.state.travelerName,
      travelerImage: this.state.traverlerImageUrl,
      serviceId: this.state.serviceId,
      body: this.state.body,
    };
    const url = 'https://us-central1-travista-chat.cloudfunctions.net/api/review'
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ loading: false });
        this.props.navigation.goBack();
      })
      .catch(error => {
        if (error.message === 'Network request failed') {
          alert('Connection faild. Try again later.')
          this.setState({ loading: false })
        }
        else {
          alert(error.message);
        }
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            size='large'
            color='#c6c6c6'
          />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Avatar
              rounded
              size={50}
              containerStyle={styles.avatar}
              source={{ uri: this.state.traverlerImageUrl === '' ? ' ' : this.state.traverlerImageUrl }}
            />
            <Text style={styles.name}>{this.state.travelerName}</Text>
          </View>
          <View style={styles.body}>
            <Input
              multiline={true}
              label='Add Reveiw :'
              value={this.state.body}
              onChangeText={text => this.setState({ body: text })}
              errorMessage={this.state.errorMessage}
              errorStyle={this.state.errorStyle}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  body: {
    flexGrow: 1,
  },
  avatar: {
    margin: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500'
  },
  btnContainer: {
    marginRight: 20
  },
  errorInput: {
    color: 'red',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
})