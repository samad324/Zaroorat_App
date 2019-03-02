import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcons";
import TabComponent from "../components/TabComponent";

import Feed from "../screen/Feed/Feed";
import Search from "../screen/Search/Search";
import ViewCategoryScreen from "../screen/ViewCategory/ViewCategory";
import AddServiceScreen from "../screen/AddService/AddService";
import MapsSreen from "../screen/Maps/Maps";
import ViewServiceScreen from "../screen/ViewService/ViewService";
import ServicesDashboardScreen from "../screen/ServicesDashboard/ServicesDashboard";

const FeedScreen = createStackNavigator({
  FeedScreen: Feed
});

const SearchScreen = createStackNavigator({
  SearchScreen: Search
});

const ViewCategory = createStackNavigator({
  ViewCategory: ViewCategoryScreen
});

const AddService = createStackNavigator({
  AddService: AddServiceScreen
});

const Maps = createStackNavigator({
  Maps: MapsSreen
});

const ViewService = createStackNavigator({
  ViewService: ViewServiceScreen
});

const ServicesDashboard = createStackNavigator({
  ServicesDashboard: ServicesDashboardScreen
});

const TabsConfig = {
  tabBarComponent: props => <TabComponent {...props} />,
  swipeEnabled: false,
  tabBarOptions: {
    swipeEnabled: true,
    activeTintColor: "#2abf88",
    inactiveTintColor: "#ffffff",
    pressColor: "#2abf88",
    pressOpacity: 1,
    tabStyle: {
      backgroundColor: "#2abf88"
    },
    indicatorStyle: {
      backgroundColor: "#2abf88"
    }
  }
};

const allTabs = {
  FeedScreen,
  SearchScreen
};

const Tabs = createMaterialTopTabNavigator(allTabs, TabsConfig);

export default createAppContainer(
  createStackNavigator(
    {
      Tabs,
      ViewCategory,
      AddService,
      Maps,
      ViewService,
      ServicesDashboard
    },
    {
      headerMode: "none"
    }
  )
);
