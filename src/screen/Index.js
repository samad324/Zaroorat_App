import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";

import Tabs from "../navigation/TabNavigation";
import { Styles } from "./Styles";

export class componentName extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Zaroorat",
      headerTintColor: "#fff",
      headerTitleStyle: Styles.headerTitleStyle,
      headerStyle: Styles.headerStyle,
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate("Notification")}
          style={Styles.norBtn}
        >
          <Image source={require("../../assets/images/alarm-bell.png")} />
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={Styles.menuBtn}
        >
          <Image source={require("../../assets/images/menu.png")} />
        </TouchableOpacity>
      )
    };
  };
  render() {
    return <Tabs />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentName);
