import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { Colors } from "../constants/index";

export default class TabComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: "FeedScreen"
    };
  }

  navigate = route => {
    const { navigate } = this.props.navigation;

    this.setState({ route });
    navigate(route);
  };

  render() {
    const { route } = this.state;
    return (
      <View style={Styles.container}>
        <View style={Styles.wpapper}>
          <View style={Styles.tabContainer}>
            <TouchableOpacity
              style={[Styles.tabBtn, route == "FeedScreen" && Styles.activeTab]}
              onPress={() => this.navigate("FeedScreen")}
            >
              <Text
                style={[
                  Styles.btnTxt,
                  route == "FeedScreen" && Styles.activeTxt
                ]}
              >
                Feed
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.tabContainer}>
            <TouchableOpacity
              style={[
                Styles.tabBtn,
                route == "SearchScreen" && Styles.activeTab
              ]}
              onPress={() => this.navigate("SearchScreen")}
            >
              <Text
                style={[
                  Styles.btnTxt,
                  route == "SearchScreen" && Styles.activeTxt
                ]}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const Styles = {
  container: {
    backgroundColor: Colors.blue,
    height: 60
  },
  wpapper: {
    flexDirection: "row",
    flex: 1,
    borderColor: "#fff",
    borderWidth: 4,
    borderRadius: 60,
    marginHorizontal: 40,
    marginVertical: 10
  },
  tabContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  tabBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnTxt: {
    color: "#fff"
  },
  activeTxt: {
    color: Colors.blue
  },
  activeTab: {
    backgroundColor: "#fff",
    flex: 1,
    height: 40,
    borderRadius: 60
  }
};
