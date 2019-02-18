import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { AuthLoadingScreen, LoginScreen } from "../screens/screensConfig";

import { AppDrawerNavigator } from "./drawer.navigator";

/**
 |--------------------------------------------------
 | Main React-Navigation Hub 🏡
|--------------------------------------------------
*/

const AuthStack = createStackNavigator({ LoginScreen }, { headerMode: "none" });

const AppNavigatorContainer = createSwitchNavigator(
  {
    App: AppDrawerNavigator,
    Auth: AuthStack,
    AuthLoadingScreen
  },
  {
    initialRouteName: "AuthLoadingScreen"
  }
);

export const AppNavigator = createAppContainer(AppNavigatorContainer);
