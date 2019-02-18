import React, { Component } from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import { styles } from "../styles";
import { FacebookAuth } from "../../components/FacebookAuth";

/**
|--------------------------------------------------
| Login Screen with KeyboardAvoidingView ⌨️
|--------------------------------------------------
*/

class LoginWithNav extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FacebookAuth />
      </View>
    );
  }
}

export const Login = withNavigation(LoginWithNav);
