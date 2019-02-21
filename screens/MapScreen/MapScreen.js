import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { fetchServicesForLocations } from "../../config/firebase";
import { Styles } from "./Styles";

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      coordinates : []
    };
  }

  async componentDidMount() {
    const { coordinates } = this.state;
    const arr = [];
    const services = await fetchServicesForLocations();
    for(let i=0; i< services.length; i++){
      arr.push({...services[i].location, title: services[i].title});
    }
    this.setState({
      coordinates : arr
    })
    console.log('Arr',arr);
  }

  render() {
    const { coordinates } = this.state;
    return (
      <View style={Styles.container}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={{ flex: 1 }}
        >
        {coordinates.map((value,index) => {
          return (<MapView.Marker
            coordinate={{
              latitude : value.latitude,
              longitude : value.longitude
            }}
            image={require("../../assets/images/map-icon.png")}
            title={value.title}
            style={{width : 20 , height : 20}}
            key= {Math.random().toString()}
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
