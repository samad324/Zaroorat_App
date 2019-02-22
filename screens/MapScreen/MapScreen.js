import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { fetchServicesForLocations } from "../../config/firebase";
import { Styles } from "./Styles";
import { Permissions, Contacts, Location } from "expo";
import { calculateDistance } from '../../config/helpers';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      currentLocation: {
        latitude: 24.90479,
        longitude: 67.0773317
      }
    };
  }

  getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
        alert("Ah! we can't access your location!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }

      return coords;
    }
    catch (e) {
      console.log("e =>", e);
      throw e;
    }
  };

  async componentDidMount() {
    const { coordinates } = this.state;
    const arr = [];
    try {
      const services = await fetchServicesForLocations();
      const currentLocation = await this.getLocationAsync();

      for (let i = 0; i < services.length; i++) {
        const distance = calculateDistance(currentLocation, services[i].location);
        console.log("distance =>", distance);

        if (distance <= 10) {
          arr.push({ ...services[i].location, title: services[i].title });
        }
      }
      this.setState({
        coordinates: arr,
        currentLocation
      })
      console.log('Arr', arr);
    }
    catch (e) {
      console.log(e)
      alert("Error in Map screen")
    }
  }

  render() {
    const { coordinates, currentLocation } = this.state;
    
    return (
      <View style={Styles.container}>
        <MapView
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: currentLocation.latitude,
            longitudeDelta: currentLocation.longitude
          }}
          style={{ flex: 1 }}
        >
          {coordinates.map((value, index) => {
            return (<MapView.Marker
              coordinate={{
                latitude: value.latitude,
                longitude: value.longitude
              }}
              image={require("../../assets/images/map-icon.png")}
              title={value.title}
              style={{ width: 20, height: 20 }}
              key={Math.random().toString()}
            />)
          })}
        </MapView>
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
