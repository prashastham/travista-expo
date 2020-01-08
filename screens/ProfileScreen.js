import { createStackNavigator } from "react-navigation";
import Profile from "./Profile/Profile";
import CreatePost from "./Profile/CreatePost";
import EditProfile from './Profile/EditProfile';
import ServiceProfileScreen from './Profile/ServiceProfile';

const ProfileStackNavigator = createStackNavigator(
  {
    Profile:Profile,
    CreatePost:CreatePost,
    EditProfile: EditProfile,
    ServiceProfile: ServiceProfileScreen
  },
  { initialRouteName: "Profile" }
);

export default ProfileStackNavigator;
