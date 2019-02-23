import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

import ChatScreen from "../screens/ChatScreen/ChatScreen";
import JobDetailsScreen from "../screens/JobDetailsScreen/JobDetailsScreen";
import ViewMapScreen from "../screens/MapScreen/MapScreen";
import CategoryScreen from "../screens/Category/Category";
import CurrentJobsScreen from "../screens/CurrentJobs/CurrentJobs";
import JobListScreen from "../screens/JobList/JobList";

import { Colors, Fonts } from "../constants/index";

const headerBackground = require("../assets/images/topBarBg.png");

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Zaroorat App",
          headerLeft: null,
          headerBackground: (
            <Image
              style={{ flex: 1 }}
              source={headerBackground}
              resizeMode="cover"
            />
          )
        };
      }
    },
    ChatScreen: {
      screen: ChatScreen,
      navigationOptions: {
        title: "Chats"
      }
    },
    JobDetailsScreen: {
      screen: JobDetailsScreen,
      navigationOptions: {
        title: "Details"
      }
    },
    CategoryScreen: {
      screen: CategoryScreen
    },
    CurrentJobsScreen: {
      screen: CurrentJobsScreen
    },
    JobListScreen: {
      screen: JobListScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        titleStyle: {
          fontFamily: Fonts.primaryLight
        },
        headerStyle: {
          backgroundColor: Colors.primary,
          borderBottomWidth: 0,
          alignItems: "center"
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
              source={require("../assets/images/icons/arrow-back.png")}
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

export default createAppContainer(stackNavigator);
