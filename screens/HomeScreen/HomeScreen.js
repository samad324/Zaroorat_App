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

const chartIcon = require("../../assets/images/pages/chart.png");
const calendarIcon = require("../../assets/images/pages/calendar.png");
const chatIcon = require("../../assets/images/pages/chat.png");
const galleryIcon = require("../../assets/images/pages/gallery.png");
const profileIcon = require("../../assets/images/pages/profile.png");

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

  showCategory = category => {
    this.props.navigation.navigate("CategoryScreen", { category });
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
                <TouchableOpacity
                  onPress={() => this.showCategory(category.name)}
                >
                  <Image
                    resizeMode={"contain"}
                    source={{ uri: category.thumbnail }}
                    style={styles.tileImg}
                  />
                  <Text style={styles.text}>{category.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          {/* <ScrollView contentContainerStyle={styles.row}>
          {allCategories.map((item, key) => (
            // <View key={key}>
            //   <TouchableOpacity style={styles.item}>
            //     <Image
            //       resizeMode="contain"
            //       source={{ uri: item.thumbnail }}
            //       style={styles.itemImage}
            //     />
            //     <Text style={styles.itemText}>{"Charts"}</Text>
            //   </TouchableOpacity>
            // </View>
            <View>
              <TouchableOpacity style={styles.item}>
                <Image
                  resizeMode="contain"
                  source={galleryIcon}
                  style={styles.itemImage}
                />
                <Text style={styles.itemText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          ))} */}
          {/* <View>
            <TouchableOpacity style={styles.item}>
              <Image
                resizeMode="contain"
                source={chartIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Charts</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item}>
              <Image
                resizeMode="contain"
                source={galleryIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Gallery</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item}>
              <Image
                resizeMode="contain"
                source={profileIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item}>
              <Image
                resizeMode="contain"
                source={chatIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Chats</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item}>
              <Image
                resizeMode="contain"
                source={calendarIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Calendar</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item}>
              <Image
                resizeMode="contain"
                source={profileIcon}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>Login</Text>
            </TouchableOpacity>
          </View> */}
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
