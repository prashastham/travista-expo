import { createStackNavigator } from "react-navigation";
import Map from "./Map/Map";
import Search from './Map/Search';

const MapStackNavigator = createStackNavigator(
  {
    Map:Map,
    Search:Search,
  },
  { initialRouteName: "Map" }
);

export default MapStackNavigator;