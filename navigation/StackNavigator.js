import { createStackNavigator } from "react-navigation";
import HomeScreen from "./AppNavigator";
import AuthScreen from "../screens/Login/Login";

const Routers = createStackNavigator({
  AuthScreen: { screen: AuthScreen },
  HomeScreen: { screen: HomeScreen },
});

export default Routers;
