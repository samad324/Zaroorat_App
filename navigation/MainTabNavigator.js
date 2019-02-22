import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LinksScreen from "../screens/LinksScreen/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import InboxScreen from "../screens/InboxScreen/InboxScreen";
import AddServicesScreen from "../screens/AddServicesScreen/AddServicesScreen"
import JobDetailsScreen from "../screens/JobDetailsScreen/JobDetailsScreen";
import ViewMapScreen from "../screens/MapScreen/MapScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

// const ChatScreenStack = createStackNavigator({
//   Chat: ChatScreen
// });

// ChatScreenStack.navigationOptions = {
//   tabBarLabel: "Chat",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "md-chatboxes" : "md-chatboxes"}
//       />
//   )
// };

const InboxScreenStack = createStackNavigator({
  Inbox: InboxScreen
});

InboxScreenStack.navigationOptions = {
  tabBarLabel: "Chat",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "md-chatboxes" : "md-chatboxes"}
    />
  )
};

const ServicesScreen = createStackNavigator({
  ServicesScreen: AddServicesScreen
});

ServicesScreen.navigationOptions = {
  tabBarLabel: "Services",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const MapScreen = createStackNavigator({
  Map: ViewMapScreen
});

MapScreen.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  InboxScreenStack,
  ServicesScreen,
  MapScreen
})

const MainStack = createStackNavigator({
  TabNavigator: TabNavigator,
  JobDetailsScreen: JobDetailsScreen,
  ChatScreen: ChatScreen
}, {
    headerMode: "none"
  })

export default MainStack;

