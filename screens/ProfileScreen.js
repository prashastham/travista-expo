import { createStackNavigator } from "react-navigation";
import Profile from "./Profile/Profile";
import CreatePost from "./Profile/CreatePost";
import EditProfile from './Profile/EditProfile';

const ProfileStackNavigator = createStackNavigator(
  {
    Profile:Profile,
    CreatePost:CreatePost,
    EditProfile: EditProfile
  },
  { initialRouteName: "Profile" }
);

export default ProfileStackNavigator;
