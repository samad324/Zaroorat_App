import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Dimensions, Image, TouchableOpacity } from "react-native";

const headerBackground = require("../../assets/topBarBg.png");
const backArrow = require("../../assets/icons/arrow-back.png");

import SideMenu from "../components/Sidemenu";
import Main from "../screen/Index";
import { Colors, Fonts } from "../constants/index";

import Notification from "../screen/Notification/Notification";
import ViewCategory from "../screen/ViewCategory/ViewCategory";

const { width } = Dimensions.get("window");

const MainScreen = createStackNavigator(
  {
    Feed: { screen: Main },
    Notification: { screen: Notification },
    ViewCategory: { screen: ViewCategory }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        titleStyle: {
          fontFamily: Fonts.primaryLight
        },
        headerStyle: {
          backgroundColor: Colors.primary,
          borderBottomWidth: 0
        },
        headerBackground: (
          <Image
            style={{ flex: 1 }}
            source={headerBackground}
            resizeMode="cover"
          />
        ),
        headerTitleStyle: {
          color: Colors.white,
          fontFamily: Fonts.primaryRegular
        },
        headerTintColor: "#222222",
        headerLeft: props => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              paddingLeft: 25
            }}
          >
            <Image
              source={backArrow}
              resizeMode="contain"
              style={{
                height: 20
              }}
            />
          </TouchableOpacity>
        )
      };
    }
  }
);

export default createDrawerNavigator(
  {
    Feed: {
      screen: MainScreen
    }
  },
  {
    contentComponent: SideMenu,
    drawerWidth: width * 0.84
  }
);
