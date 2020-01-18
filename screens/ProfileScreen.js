import { createStackNavigator } from "react-navigation";
import Profile from "./Profile/Profile";
import CreatePost from "./Profile/CreatePost";
import EditProfile from './Profile/EditProfile';
import ServiceProfileScreen from './Profile/ServiceProfile';
import ServiceFilter from "./Home/ServiceFilter";
import AddReview from "./Profile/AddReview";
import Gallery from "../elements/Gallery";

const ProfileStackNavigator = createStackNavigator(
  {
    Profile:Profile,
    CreatePost:CreatePost,
    EditProfile: EditProfile,
    ServiceProfile: ServiceProfileScreen,
    ServiceFilter:ServiceFilter,
    AddReview:AddReview,
    Gallery:Gallery,
  },
  { initialRouteName: "Profile" }
);

export default ProfileStackNavigator;
