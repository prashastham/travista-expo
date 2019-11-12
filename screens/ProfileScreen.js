import { createStackNavigator } from "react-navigation";
import Profile from "./Profile/Profile";
import Friend from "./Profile/Friend";
import EditProfile from './Profile/EditProfile';


const ProfileStackNavigator = createStackNavigator(
  {
    Profile:Profile,
    Friend:{
      screen:Friend,
      navigationOptions: ({ navigation }) => ({
        title: 'Friends',
      }),
    } ,
    EditProfile: EditProfile
  },
  { initialRouteName: "Profile" }
);

export default ProfileStackNavigator;
