import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { Styles } from "./Styles";

export class ServicesDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderTabs = () => {};

  render() {
    return (
      <View style={Styles.container}>
        <Text>ACtive</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesDashboard);
