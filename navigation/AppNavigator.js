import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Login from "../screens/LoginScreen/LoginScreen";
import MainTabNavigator from "./MainTabNavigator";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Login: Login,
    Main: MainTabNavigator,
  })
);
