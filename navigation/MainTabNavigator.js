/* eslint-disable import/no-unresolved */
import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation";

import { Colors, Fonts } from "../constants";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LinksScreen from "../screens/LinksScreen/LinksScreen";
import ViewMapScreen from "../screens/MapScreen/MapScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import InboxScreen from "../screens/InboxScreen/InboxScreen";
import AddServicesScreen from "../screens/AddServicesScreen/AddServicesScreen";

const iconHome = require("../assets/images/home.png");
const iconService = require("../assets/images/add.png");
const iconSearch = require("../assets/images/search.png");
const iconMap = require("../assets/images/map.png");
const iconChat = require("../assets/images/chat.png");
const iconSetting = require("../assets/images/setting.png");

const hederBackground = require("../assets/images/topBarBg.png");

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
    paddingHorizontal: 10
  },
  tabBarIcon: {
    width: 23,
    height: 23
  },
  tabBarIconFocused: {
    tintColor: Colors.primary
  },
  headerContainer: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10
  },
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70
  },
  headerCaption: {
    fontFamily: Fonts.primaryRegular,
    color: Colors.white,
    fontSize: 18
  }
});

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Search: {
      screen: LinksScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={hederBackground} />
            <Text style={styles.headerCaption}>Search</Text>
          </View>
        )
      }
    },
    Map: {
      screen: ViewMapScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={hederBackground} />
            <Text style={styles.headerCaption}>Map</Text>
          </View>
        )
      }
    },
    Chats: {
      screen: InboxScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={hederBackground} />
            <Text style={styles.headerCaption}>Chat</Text>
          </View>
        )
      }
    },
    Service: {
      screen: AddServicesScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={hederBackground} />
            <Text style={styles.headerCaption}>Service</Text>
          </View>
        )
      }
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={hederBackground} />
            <Text style={styles.headerCaption}>Settings</Text>
          </View>
        )
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconSource;
        switch (routeName) {
          case "Home":
            iconSource = iconHome;
            break;
          case "Search":
            iconSource = iconSearch;
            break;
          case "Map":
            iconSource = iconMap;
            break;
          case "Chats":
            iconSource = iconChat;
            break;
          case "Service":
            iconSource = iconService;
            break;
          case "SettingsScreen":
            iconSource = iconSetting;
            break;
          default:
            iconSource = iconSetting;
        }
        return (
          <View style={styles.tabBarItemContainer}>
            <Image
              resizeMode="contain"
              source={iconSource}
              style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
            />
          </View>
        );
      }
    }),
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: true,
      style: {
        backgroundColor: Colors.white,
        borderTopWidth: 0.5,
        borderTopColor: Colors.blue
      },
      labelStyle: {
        color: Colors.grey
      }
    }
  }
);
