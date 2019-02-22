import React from "react";
import { createStackNavigator } from "react-navigation";
import { Profile, EditProfile } from "../Profile";
import { headerStyles } from "../../shared/headerStyles";

class ProfileScreen extends React.Component {
  render() {
    return <Profile />;
  }
}

class EditProfileScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Edit Profile",
    title: "Edit Profile"
  };

  render() {
    return <EditProfile />;
  }
}

export const ProfileStack = createStackNavigator(
  {
    ProfileScreen: { screen: ProfileScreen },
    EditProfileScreen: { screen: EditProfileScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Profile",
        title: "Profile",
        drawerLabel: "Profile",
        ...headerStyles(navigation)
      };
    }
  }
);
