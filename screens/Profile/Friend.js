import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {
    createStackNavigator,
    createAppContainer
} from "react-navigation";

import MyFriendsScreen from './MyFriends';
import SuggestionScreen from './Suggestions';

const MyFriendsStack = createStackNavigator(
    {
      MyFriends: MyFriendsScreen
    },
    {
      headerMode:'none'
    }
);

MyFriendsStack.navigationOptions = {
    tabBarLabel: "MyFriends",
};

const SuggestionsStack = createStackNavigator(
    {
      Suggestion: SuggestionScreen
    },
    {
      headerMode:'none'
    }
);

SuggestionsStack.navigationOptions = {
    tabBarLabel: "Suggestion",
};

const tabNavigator = createMaterialTopTabNavigator({
    MyFriendsStack,
    SuggestionsStack
},
{
  tabBarOptions:
  {
    labelStyle:{fontSize: 15,fontWeight: '300',color:'#fff'},
    style:{backgroundColor:'#4ac959'},
    indicatorStyle:{backgroundColor:'green'}
}
});

export default createAppContainer(tabNavigator);