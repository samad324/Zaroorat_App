import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./Navigation";
import DrawerNavigation from "./Drawernavigation";
import TabNavigaiton from "./TabNavigation";

export default createAppContainer(
  createSwitchNavigator({
    Login,
    WithDrawer: DrawerNavigation,
    TabNavigaiton: TabNavigaiton
  })
);
