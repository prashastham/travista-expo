import { createStackNavigator } from "react-navigation";
import Profile from "./Profile/Profile";
import Friend from "./Profile/Friend";


const ProfileStackNavigator = createStackNavigator(
  {
    Profile: {
      screen:Profile,
      
    },
    Friend: Friend
  },
  { initialRouteName: "Profile" }
);

export default ProfileStackNavigator;
