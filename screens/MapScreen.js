import { createStackNavigator } from "react-navigation";
import Map from "./Map/Map";

const MapStackNavigator = createStackNavigator(
  {
    Map:Map,
  },
  { initialRouteName: "Map" }
);

export default MapStackNavigator;