import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";

export default class MyFriends extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          data: [],
          page: 1,
          seed: 1,
          error: null,
          refreshing: false,
          firstload:true
        };
      }
    
      componentDidMount() {
        this.makeRemoteRequest();
      }
    
      makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=50`;
        this.setState({ loading: true});
    
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: page === 1 ? res.results : [...this.state.data, ...res.results],
              error: res.error || null,
              loading: false,
              refreshing: false,
              firstload:false
            });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
    
      };
    
      handleRefresh = () => {
        this.setState(
          {
            page: 1,
            seed: this.state.seed + 1,
            refreshing: true
          },
          () => {
            this.makeRemoteRequest();
          }
        );
      };
    
      handleLoadMore = () => {
        this.setState(
          {
            page: this.state.page + 1
          },
          () => {
            this.makeRemoteRequest();
          }
        );
      };
    
      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };
    
    
      renderFooter = () => {
        // if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
        
      };
    
      render() {
        return (
            (this.state.loading && this.state.firstload)
            ? 
                <View
                    style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                    borderColor: "#CED0CE"
                    }}
                >
                    <ActivityIndicator animating size="large" />
                </View>
            
            :
                <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                    <ListItem
                    leftAvatar={{
                      title: item.name.first[0],
                      source: { uri: item.picture.thumbnail },
                    }}
                    title={`${item.name.first} ${item.name.last}`}
                    subtitle={item.email}
                    containerStyle={{ borderBottomWidth: 0 }}
                    chevron
                    onPress={()=>{alert('hello this is onpress')}}
                    />
                )}
                keyExtractor={item => item.email}
                ItemSeparatorComponent={this.renderSeparator}
                // ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={50}
                removeClippedSubviews = {true}
                />
        );
      }
}
