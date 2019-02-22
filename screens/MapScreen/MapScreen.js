import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { fetchServicesForLocations } from "../../config/firebase";
import { Styles } from "./Styles";
import { Permissions, Contacts, Location } from "expo";
import { calculateDistance } from "../../config/helpers";
import MapViewDirections from "react-native-maps-directions";
import Polyline from "@mapbox/polyline";

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      currentLocation: null,
      coords: null
    };
  }

  getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        alert("Ah! we can't access your location!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

      return coords;
    } catch (e) {
      console.log("e =>", e);
      throw e;
    }
  };

  async componentDidMount() {
    const arr = [];
    try {
      const services = await fetchServicesForLocations();
      const currentLocation = await this.getLocationAsync();

      for (let i = 0; i < services.length; i++) {
        const distance = calculateDistance(
          currentLocation,
          services[i].location
        );
        console.log("distance =>", distance);

        if (distance <= 10) {
          arr.push({ ...services[i].location, title: services[i].title });
        }
      }
      this.setState({
        coordinates: arr,
        currentLocation
      });
      this.getDirections();
      console.log("Arr", arr);
    } catch (e) {
      console.log(e);
      alert("Error in Map screen");
    }
  }

  async getDirections() {
    let { currentLocation } = this.state;
    currentLocation = `${currentLocation.latitude},${
      currentLocation.longitude
    }`;
    let destinationLoc = {
      latitude: 24.8472729,
      longitude: 67.086234
    };
    destinationLoc = `${destinationLoc.latitude},${destinationLoc.longitude}`;
    const key = "AIzaSyBO2FsBMbU1486vfEfWrKzRUR1IziBnFRc";
    console.log(currentLocation, destinationLoc);

    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?key=${key}&origin=${currentLocation}&destination=${destinationLoc}`
      );
      let respJson = await resp.json();
      console.log(respJson);
      if (respJson.error_message) {
        throw respJson.error_message;
      }
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });

      console.log(coords);
      this.setState({ coords: coords });
      return coords;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  render() {
    const { coordinates, currentLocation, coords } = this.state;
    console.log("coordinates", coordinates);
    return (
      <View style={Styles.container}>
        {currentLocation ? (
          <MapView
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0121,
              longitudeDelta: 0.015
            }}
            style={{ flex: 1 }}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            mapType={"standard"}
            loadingEnabled={true}
            zoomEnabled={true}
          >
            {/* <MapViewDirections
              origin={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
              }}
              destination={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
              }}
              apikey={"AIzaSyCwjyTFzgxg-wUU5rfcny19N9w7EGlq31M"}
              strokeWidth={4}
              strokeColor="#0059b3"
            />*/}
            {/* {coordinates.map((value, index) => {
              return (
                <MapView.Marker
                  coordinate={{
                    latitude: 24.8472729,
                    longitude: 67.086234
                  }}
                  image={require("../../assets/images/map-icon.png")}
                  title={value.title}
                  style={{ width: 20, height: 20 }}
                  key={Math.random().toString()}
                />
              );
            })} */}

            {coords && (
              <MapView.Polyline
                coordinates={this.state.coords}
                strokeWidth={4}
                strokeColor="#0080ff"
              />
            )}
            {coordinates.map((value, index) => {
              return (
                <MapView.Marker
                  coordinate={{
                    latitude: value.latitude,
                    longitude: value.longitude
                  }}
                  image={require("../../assets/images/map-icon.png")}
                  title={value.title}
                  style={{ width: 20, height: 20 }}
                  key={Math.random().toString()}
                />
              );
            })}
          </MapView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        )}
        {/* //   <MapView
      //     style={{ flex: 1 }}
      //     initialRegion={{
      //       latitude: currentLocation.latitude,
      //       longitude: currentLocation.longitude,
      //       latitudeDelta: currentLocation.latitude,
      //       longitudeDelta: currentLocation.longitude
      //     }}
      //     minZoomLevel={10}
      //     showsUserLocation={true}
      //   >
      //     <MapViewDirections
      //       origin={{
      //         latitude: currentLocation.latitude,
      //         longitude: currentLocation.longitude
      //       }}
      //       destination={{
      //         latitude: 24.8472729,
      //         longitude: 67.086234
      //       }}
      //       apikey={"AIzaSyBO2FsBMbU1486vfEfWrKzRUR1IziBnFRc"}
      //       strokeWidth={3}
      //       strokeColor="blue"
      //     />
      //   </MapView>
      // </View>
      // <View style={{ flex: 1 }}>
      //   <MapView
      //     showUserLocation
      //     followUserLocation
      //     loadingEnabled
      //     region={{
      //       latitude: currentLocation.latitude,
      //       longitude: currentLocation.longitude,
      //       latitudeDelta: 0.015,
      //       longitudeDelta: 0.0121
      //     }}
      //   >
      //     <MapView.Marker
      //       coordinate={{
      //         latitude: 24.8472729,
      //         longitude: 67.086234
      //       }}
      //       title={"Marker 1"}
      //       description={"this. i smae"}
      //     />
      //   </MapView> */}
      </View>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     user: state.authReducer.user
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {};
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddServicesScreen);
