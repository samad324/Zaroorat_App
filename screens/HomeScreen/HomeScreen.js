import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View
} from "react-native";
import { WebBrowser, Permissions, Location } from "expo";
import { connect } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";

import { setAllUsers } from "../../store/actions/authAction";
import { styles } from "./Styles";
import { setAllCategories } from "../../store/actions/generalAction";

import { setUserLocation } from "../../config/firebase";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.getLocationAsync();
    this.fetchAllUsersRealTime();
    this.getCategories();
  }

  async fetchAllUsersRealTime() {
    const { setAllUsers } = this.props;

    try {
      const doc = firebase.firestore().collection("users");
      doc.onSnapshot(snapshot => {
        const allUsers = [];

        snapshot.forEach(data => {
          allUsers.push(data.data());
        });

        setAllUsers(allUsers);
      });
    } catch (e) {
      alert("Error");
      console.log("e =>", e);
    }
  }

  getCategories = async () => {
    const { setAllCategories } = this.props;

    try {
      const doc = firebase.firestore().collection("categories");
      doc.onSnapshot(snapshot => {
        const allCategory = [];

        snapshot.forEach(data => {
          allCategory.push(data.data());
        });

        setAllCategories(allCategory);
      });
    } catch (e) {
      alert("Error");
      console.log("e =>", e);
    }
  };

  getLocationAsync = async () => {
    const { user } = this.props;

    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        alert("Ah! we can't access your location!");
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

      setUserLocation(coords, user.uid);

      this.setState({ location });
    } catch (e) {
      console.log("e =>", e);
    }
  };

  render() {
    const { allCategories } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          // style={styles.contentContainer}
          contentContainerStyle={styles.contentContainer}
        >
          {allCategories.map((category, index) => {
            return (
              <View
                style={[
                  styles.tile,
                  allCategories.length % 3 !== 0 &&
                    allCategories.length - index <= 2 &&
                    styles.extraSize
                ]}
                key={category.name}
              >
                <Image
                  source={{ uri: category.thumbnail }}
                  style={styles.tileImg}
                />
                <Text styles={styles.tileTxt}>{category.name}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    allUsers: state.authReducer.allUsers,
    allCategories: state.generalReducer.allCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAllCategories: payload => dispatch(setAllCategories(payload)),
    setAllUsers: payload => dispatch(setAllUsers(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
