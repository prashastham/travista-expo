import { createStackNavigator } from "react-navigation";
import Profile from "./Profile/Profile";
import Friend from "./Profile/Friend";
import EditProfile from './Profile/EditProfile';
import Colors from '../constants/Colors';

const ProfileStackNavigator = createStackNavigator(
  {
    Profile:Profile,
    Friend:{
      screen:Friend,
      navigationOptions: ({ navigation }) => ({
        title: 'Friends',
        headerTintColor:Colors.stackHeaderTintColor,
      }),
    } ,
    EditProfile: EditProfile
  },
  { initialRouteName: "Profile" }
);

export default ProfileStackNavigator;
