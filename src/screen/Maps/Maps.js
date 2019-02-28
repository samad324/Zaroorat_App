import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import Polyline from "@mapbox/polyline";
import { Button, Toast } from "native-base";

import { Styles } from "./Styles";
import { getLocationAsync, measureDistance } from "../../config/helpers";
import { getServices, addToDB, uploadImages } from "../../config/firebase";

import { Colors } from "../../constants/index";

export class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "nearby",
      isLoading: true,
      gragedLocation: {},
      filteredServices: []
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount = async () => {
    const { type } = this.props.navigation.state.params;
    const currentLocation = await getLocationAsync();

    if (type == "nearby") {
      await this.forNearby(currentLocation);
    }
    this.setState({
      currentLocation,
      isLoading: false,
      gragedLocation: { ...currentLocation },
      type
    });
  };

  forNearby = async currentLocation => {
    try {
      const services = await getServices();
      const filteredServices = await measureDistance(services, {
        ...currentLocation
      });
      this.setState({ filteredServices });
    } catch (e) {
      alert(e);
    }
  };

  saveService = async () => {
    const { type, payload } = this.props.navigation.state.params;
    const { gragedLocation } = this.state;

    this.setState({ isLoading: true });

    try {
      if (payload.image) {
        const imageUrl = await uploadImages(payload.image);
        payload.image = imageUrl;
      } else {
        payload.image = payload.category.thumbnail;
      }

      const data = {
        ...payload,
        location: gragedLocation
      };

      await addToDB("services", data);
      this.showToast("Added Succussfully!", "success");
      setTimeout(() => {
        this.navigateTo("Tabs");
      }, 2000);
      this.setState({ isLoading: false });
    } catch (error) {
      this.showToast("Something Went Wrong!", "danger");
      this.setState({ isLoading: false });
    }
  };

  navigateTo = route => {
    const { navigate } = this.props.navigation;
    navigate(route);
  };

  showToast = (message, type) => {
    Toast.show({
      text: message,
      buttonText: "Okay",
      type
    });
  };

  renderForService = () => {
    const { currentLocation } = this.state;
    return (
      <View style={Styles.container}>
        <MapView
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0121,
            longitudeDelta: 0.015
          }}
          style={{ flex: 1 }}
          loadingEnabled={true}
          zoomEnabled={true}
        >
          <Marker
            coordinate={currentLocation}
            draggable
            title={""}
            description={""}
            onDragEnd={e =>
              this.setState({ gragedLocation: e.nativeEvent.coordinate })
            }
          />
        </MapView>
        <Button rounded style={Styles.signupBtn} onPress={this.saveService}>
          <Text style={Styles.btnText}>Save</Text>
        </Button>
      </View>
    );
  };

  renderForNearby = () => {
    const { currentLocation, filteredServices } = this.state;
    return (
      <View style={Styles.container}>
        <MapView
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0121,
            longitudeDelta: 0.015
          }}
          showsCompass
          followsUserLocation
          showsUserLocation
          style={{ flex: 1 }}
          loadingEnabled={true}
          zoomEnabled={true}
        >
          {this.generateMarkers(filteredServices)}
        </MapView>
      </View>
    );
  };

  generateMarkers = services => {
    return services.map((value, index) => {
      return (
        <MapView.Marker
          coordinate={{
            latitude: value.latitude,
            longitude: value.longitude
          }}
          title={value.title}
          style={{ width: 20, height: 20 }}
          key={Math.random().toString()}
        />
      );
    });
  };

  renderView = () => {
    const { type } = this.state;
    console.log(type);
    switch (type) {
      case "dragable":
        return this.renderForService();
      case "nearby":
        return this.renderForNearby();
      default:
        break;
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={Styles.container}>
        {isLoading ? (
          <View style={Styles.container}>
            <ActivityIndicator color={Colors.blue} size="large" />
          </View>
        ) : (
          this.renderView()
        )}
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
