import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";

import { Styles } from "./Styles";
import { data } from "../../config/notifications.json";
import { Colors } from "../../constants/index";

import LikeNotification from "../../components/Notifations/LikeNotification/LikeNotification";

export default class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.setState({ data });
  }

  static navigationOptions = {
    title: "Notification",
    headerTintColor: "#fff",
    headerTitleStyle: Styles.headerStyle,
    headerStyle: {
      backgroundColor: Colors.blue
    }
  };

  render() {
    const { data } = this.state;
    return (
      <ScrollView style={Styles.container}>
        <LikeNotification data={data[0]} />
      </ScrollView>
    );
  }
}
