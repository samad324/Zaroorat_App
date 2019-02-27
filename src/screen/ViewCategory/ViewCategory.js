import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { Styles } from "./Styles";
import { Colors } from "../../constants/index";

export class ViewCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    // const { category } = navigation.state.params;
    return {
      header: null
    };
  };

  render() {
    return (
      <View>
        <Text> prop </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCategory);
