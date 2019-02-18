import React from "react";
import { View } from "react-native";
import {
  createDrawerNavigator,
  SafeAreaView,
  DrawerItems
} from "react-navigation";
import {
  AboutStack,
  HomeStack,
  ContactStack,
  ProfileStack
} from "../screens/screensConfig";
import { SignOut } from "../components/FacebookAuth";

/**
|--------------------------------------------------
| DrawerNavigator Implementation
|--------------------------------------------------
*/

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeStack },
    About: { screen: AboutStack },
    Contact: { screen: ContactStack },
    Profile: { screen: ProfileStack }
  },
  {
    contentComponent: props => (
      <View style={{ flex: 1 }}>
        <SafeAreaView
          forceInset={{
            top: "always",
            horizontal: "never"
          }}
        >
          <DrawerItems {...props} />
          <SignOut />
        </SafeAreaView>
      </View>
    )
  }
);
