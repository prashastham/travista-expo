import React ,{Component}from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
    createStackNavigator,
    createAppContainer
} from "react-navigation";
import Colors from '../../constants/Colors';

import MyFriendsScreen from './MyFriends';
import SuggestionScreen from './Suggestions';
class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static navigationOptions = {
    title: "Friends",
    headerTintColor:Colors.stackHeaderTintColor,
  };
}

const MyFriendsStack = createStackNavigator(
    {
      MyFriends: MyFriendsScreen
    }
);

MyFriendsStack.navigationOptions = {
    tabBarLabel: "MyFriends",
};

const SuggestionsStack = createStackNavigator(
    {
      Suggestion: SuggestionScreen
    }
);

SuggestionsStack.navigationOptions = {
    tabBarLabel: "Suggestion",
};

const tabNavigator = createMaterialTopTabNavigator({
    MyFriendsStack,
    SuggestionsStack
});

export default createAppContainer(tabNavigator);