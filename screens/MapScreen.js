import { createStackNavigator } from "react-navigation";
import Map from "./Map/Map";
import Search from './Map/Search';
import MapPic from './Map/MapPic';

const MapStackNavigator = createStackNavigator(
  {
    Map:Map,
    Search:Search,
    MapPic:MapPic
  },
  { initialRouteName: "Map" }
);

export default MapStackNavigator;