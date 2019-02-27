import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { Permissions, Location } from "expo";
import Polyline from "@mapbox/polyline";

import { Styles } from "./Styles";
import {
  calculateDistance,
  getLocationAsync,
  measureDistance
} from "../../config/helpers";
import { getServices } from "../../config/firebase";

export class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "nearby"
    };
  }

  componentDidMount = async () => {
    try {
      const currentLocation = await getLocationAsync();
      const services = await getServices();
    } catch (e) {
      alert(e);
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, ">>>>>");
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={Styles.container}>
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
)(componentName);
